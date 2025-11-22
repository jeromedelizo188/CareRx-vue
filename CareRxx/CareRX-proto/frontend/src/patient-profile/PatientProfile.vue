<template>
  <DashboardLayout :userName="userName">
    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-avatar-container">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" class="profile-avatar" id="profileAvatar">
          <label for="avatarUpload" class="avatar-upload-btn">
            <i class="fas fa-camera"></i>
          </label>
          <input type="file" id="avatarUpload" style="display: none;" accept="image/*">
        </div>
        <div class="profile-details">
          <h2 class="profile-name" id="profileName">{{ fullName }}</h2>
          <p class="profile-email" id="profileEmail">{{ patientData.email }}</p>
          <div class="profile-stats">
            <div class="stat-item">
              <h3>{{ date(patientData.created_at, 'Y') }}</h3>
              <p>Member Since</p>
            </div>
            <div class="stat-item">
              <h3>0</h3>
              <p>Total Visits</p>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-sections">
        <div class="section-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="section-tab"
            :class="{ active: activeTab === tab.name }"
            @click="handleTabClick(tab.name)"
          >
            {{ tab.label }}
          </div>
        </div>

        <div class="section-content">
          <div class="section-pane" v-if="activeTab === 'personal'">
            <div class="info-grid">
              <div class="info-group">
                <label>Full Name</label>
                <p>{{ patientData.first_name }} {{ patientData.last_name }}</p>
              </div>
              <div class="info-group">
                <label>Date of Birth</label>
                <p>{{ date(patientData.date_of_birth, 'MM/DD/YYYY') }}</p>
              </div>
              <div class="info-group">
                <label>Phone Number</label>
                <p>{{ patientData.phone }}</p>
              </div>
              <div class="info-group">
                <label>Email Address</label>
                <p>{{ patientData.email }}</p>
              </div>
              <div class="info-group">
                <label>Address</label>
                <p>{{ patientData.street_address }}, {{ patientData.city }}, {{ patientData.state }} {{ patientData.zip_code }}</p>
              </div>
            </div>
          </div>

          <div class="section-pane" v-if="activeTab === 'medical'">
            <div class="info-grid">
              <div class="info-group">
                <label>Blood Type</label>
                <p>{{ patientData.blood_type || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <label>Allergies</label>
                <p>{{ patientData.allergies || 'None listed' }}</p>
              </div>
              <div class="info-group">
                <label>Current Medications</label>
                <p>{{ patientData.current_medications || 'None' }}</p>
              </div>
              <div class="info-group">
                <label>Existing Conditions</label>
                <p>{{ patientData.medical_conditions || 'None' }}</p>
              </div>
            </div>
          </div>

          <div class="section-pane" v-if="activeTab === 'security'">
            <div class="info-grid">
              <div class="info-group">
                <label>Password</label>
                <p>********</p>
              </div>
              <div class="info-group">
                <label>Email Verified</label>
                <p>{{ patientData.email_verified == 1 ? 'Yes' : 'No' }}</p>
              </div>
            </div>
            
            <button class="btn btn-primary" @click="openChangePasswordModal" style="margin-top: 20px;">
              <i class="fas fa-lock"></i> Change Password 
            </button> 
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div class="modal" :class="{ active: isEditModalOpen }" @click.self="closeEditModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Edit Profile</h2>
            <button class="close-btn" @click="closeEditModal"><i class="fas fa-times"></i></button>
          </div>
          <form id="editProfileForm" @submit.prevent="saveProfile">
            <div class="form-group">
              <label for="editFirstName">First Name</label>
              <input type="text" id="editFirstName" v-model="editForm.first_name" required>
            </div>
            <div class="form-group">
              <label for="editLastName">Last Name</label>
              <input type="text" id="editLastName" v-model="editForm.last_name" required>
            </div>
            <div class="form-group">
              <label for="editPhone">Phone Number</label>
              <input type="tel" id="editPhone" v-model="editForm.phone" required>
            </div>
            <div class="form-group">
              <label for="editEmail">Email Address</label>
              <input type="email" id="editEmail" v-model="editForm.email" required>
            </div>
            <div class="form-group">
              <label for="editStreetAddress">Street Address</label>
              <input type="text" id="editStreetAddress" v-model="editForm.street_address" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-outline" @click="closeEditModal">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div class="modal" :class="{ active: isChangePasswordModalOpen }" @click.self="closeChangePasswordModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Change Password</h2>
            <button class="close-btn" @click="closeChangePasswordModal"><i class="fas fa-times"></i></button>
          </div>
          <form id="changePasswordForm" @submit.prevent="changePassword">
            <div class="form-group">
              <label for="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" v-model="passwordForm.current" required>
            </div>
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <input type="password" id="newPassword" v-model="passwordForm.new" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" v-model="passwordForm.confirm" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-outline" @click="closeChangePasswordModal">Cancel</button>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DashboardLayout } from '../shared/components'

const route = useRoute()
const patientData = ref({})
const activeTab = ref('personal')
const isEditModalOpen = ref(false)
const isChangePasswordModalOpen = ref(false)

const editForm = ref({ 
  first_name: '', 
  last_name: '', 
  phone: '', 
  email: '', 
  street_address: '' 
})

const passwordForm = ref({ current: '', new: '', confirm: '' })

const tabs = [
  { name: 'personal', label: 'Personal Information' },
  { name: 'medical', label: 'Medical Information' },
  { name: 'security', label: 'Security & Privacy' }
]

// FIX: Corrected and enhanced date utility function
const date = (dateString, format = 'MM/DD/YYYY') => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);

  if (isNaN(d)) return 'Invalid Date';

  if (format === 'Y') {
    return d.getFullYear();
  }
  
  return d.toLocaleDateString('en-US');
}

// FIX: Added the handleTabClick function to manage activeTab state
const handleTabClick = (tabName) => {
  activeTab.value = tabName;
}

const fullName = computed(() => {
  if (patientData.value.first_name && patientData.value.last_name) {
    return `${patientData.value.first_name} ${patientData.value.last_name}`
  }
  return patientData.value.first_name || ''
})

const userName = computed(() => patientData.value.first_name || 'Patient');

const openEditModal = () => {
  editForm.value = {
    first_name: patientData.value.first_name || '',
    last_name: patientData.value.last_name || '',
    phone: patientData.value.phone || '',
    email: patientData.value.email || '',
    street_address: patientData.value.street_address || ''
  }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const openChangePasswordModal = () => {
  isChangePasswordModalOpen.value = true
}

const closeChangePasswordModal = () => {
  isChangePasswordModalOpen.value = false
}

const saveProfile = () => {
  console.log('Saving profile:', editForm.value)
  alert('Profile saved successfully! (API PUT required)')
  closeEditModal()
}

const changePassword = () => {
  console.log('Changing password')
  alert('Password changed successfully! (API POST required)')
  closeChangePasswordModal()
}

const fetchProfile = async () => {
  const patientId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/patients/${patientId}/profile`)
    if (!response.ok) throw new Error('Failed to fetch profile')
    const data = await response.json()
    
    patientData.value = data
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.profile-content {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.profile-card {
  background-color: var(--white);
  border-radius: 15px;
  padding: 30px;
  box-shadow: var(--card-shadow);
  text-align: center;
  height: fit-content;
}

.profile-avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid var(--primary-light);
}

.avatar-upload-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: var(--primary-color);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.avatar-upload-btn:hover {
  background-color: var(--primary-dark);
}

.profile-details {
  text-align: left;
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 5px;
}

.profile-email {
  font-size: 14px;
  color: var(--light-text);
  margin-bottom: 20px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid var(--background);
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
}

.stat-item p {
  font-size: 12px;
  color: var(--light-text);
  text-transform: uppercase;
}

.profile-sections {
  background-color: var(--white);
  border-radius: 15px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.section-tabs {
  display: flex;
  background-color: var(--background);
}

.section-tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  font-weight: 500;
  color: var(--light-text);
  cursor: pointer;
  transition: all 0.3s;
}

.section-tab.active {
  background-color: var(--white);
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
}

.section-content {
  padding: 30px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-group {
  display: flex;
  flex-direction: column;
}

.info-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--light-text);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.info-group p {
  font-size: 16px;
  color: var(--text-color);
}

/* Must be globally accessible or in the component's <style> block */
.btn { 
  padding: 10px 20px; 
  border-radius: 8px; 
  font-weight: 600; 
  cursor: pointer; 
  transition: all 0.3s; 
  border: none; 
  font-family: 'Montserrat', sans-serif; 
  display: inline-flex; 
  align-items: center; 
  gap: 8px; 
}
.btn-primary { 
  background-color: var(--primary-color);
  color: white; 
}
.btn-primary:hover { 
  background-color: var(--primary-dark); 
}

/* Modal Styling Fixes */
.modal { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 2000; 
  display: none; 
}
.modal.active {
  display: flex;
}
.modal-content { 
  background-color: var(--white); 
  border-radius: 15px; 
  padding: 30px; 
  width: 90%; 
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 20px; 
}
.modal-header h2 { 
    font-size: 24px; 
    font-weight: 600; 
    color: var(--secondary-color); 
}

/* FIX: Close Button Styling */
.close-btn { 
  background: none; 
  border: none; 
  font-size: 20px; 
  color: var(--light-text); 
  cursor: pointer; 
  padding: 5px; 
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--primary-color); 
}
</style>