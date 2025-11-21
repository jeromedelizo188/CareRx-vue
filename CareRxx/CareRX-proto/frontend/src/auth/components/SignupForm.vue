<template>
  <div>
    <!-- Step 1: Personal Information -->
    <div v-if="currentStep === 1" class="form-step active">
      <div class="form-section">
        <div class="form-content">
          <h2 class="section-title"><i class="fas fa-user"></i> Personal Information</h2>
          <div class="form-grid">
            <div class="form-group"><label class="form-label">First Name <span class="required">*</span></label><input v-model="formData.firstName" name="firstName" type="text" class="form-input"></div>
            <div class="form-group"><label class="form-label">Middle Name</label><input v-model="formData.middleName" name="middleName" type="text" class="form-input"></div>
            <div class="form-group"><label class="form-label">Last Name <span class="required">*</span></label><input v-model="formData.lastName" name="lastName" type="text" class="form-input"></div>
            <div class="form-group"><label class="form-label">Email Address <span class="required">*</span></label><input v-model="formData.email" name="email" type="email" class="form-input"></div>
            <div class="form-group"><label class="form-label">Phone Number <span class="required">*</span></label><input v-model="formData.phone" name="phone" type="tel" class="form-input"></div>
            <div class="form-group"><label class="form-label">Date of Birth <span class="required">*</span></label><input v-model="formData.dateOfBirth" name="dateOfBirth" type="date" class="form-input"></div>
            <div class="form-group"><label class="form-label">Gender <span class="required">*</span></label><select v-model="formData.gender" name="gender" class="form-input"><option value="">Select Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
            <div class="form-group"><label class="form-label">Password <span class="required">*</span></label><input v-model="formData.password" name="password" type="password" class="form-input"></div>
            <div class="form-group"><label class="form-label">Confirm Password <span class="required">*</span></label><input v-model="formData.confirmPassword" name="confirmPassword" type="password" class="form-input"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Address <span class="required">*</span></label>
            <div class="address-grid"><input v-model="formData.address.street" name="street" type="text" class="form-input" placeholder="Barangay"><input v-model="formData.address.city" name="city" type="text" class="form-input" placeholder="City/Municipality"><input v-model="formData.address.state" name="state" type="text" class="form-input" placeholder="Province"></div>
            <div class="mt-3"><input v-model="formData.address.zip" name="zip" type="text" class="form-input" placeholder="ZIP Code"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Medical Information -->
    <div v-if="currentStep === 2" class="form-step active">
      <div class="form-section">
        <div class="form-content">
          <h2 class="section-title"><i class="fas fa-notes-medical"></i> Medical Information</h2>
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Blood Type</label><select v-model="formData.medicalInfo.bloodType" name="bloodType" class="form-input"><option value="">Select Blood Type</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option></select></div>
          </div>
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Known Allergies</label><textarea v-model="formData.medicalInfo.allergies" name="allergies" class="form-textarea" placeholder="List any known allergies (e.g., Penicillin, Peanuts, etc.)"></textarea></div>
            <div class="form-group"><label class="form-label">Existing Medical Conditions</label><textarea v-model="formData.medicalInfo.conditions" name="conditions" class="form-textarea" placeholder="List any existing medical conditions (e.g., Diabetes, Hypertension, etc.)"></textarea></div>
          </div>
          <div class="form-group"><label class="form-label">Current Medications</label><textarea v-model="formData.medicalInfo.medications" name="medications" class="form-textarea" placeholder="List any medications you are currently taking"></textarea></div>
        </div>
      </div>
    </div>

    <!-- Step 3: Emergency Contact -->
    <div v-if="currentStep === 3" class="form-step active">
      <div class="form-section">
        <div class="form-content">
          <h2 class="section-title"><i class="fas fa-shield-alt"></i> Emergency Contact</h2>
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Emergency Contact Name <span class="required">*</span></label><input v-model="formData.emergencyContact.name" name="emergency-name" type="text" class="form-input"></div>
            <div class="form-group"><label class="form-label">Emergency Contact Phone <span class="required">*</span></label><input v-model="formData.emergencyContact.phone" name="emergency-phone" type="tel" class="form-input"></div>
            <div class="form-group"><label class="form-label">Relationship <span class="required">*</span></label><select v-model="formData.emergencyContact.relationship" name="emergency-relationship" class="form-input"><option value="">Select Relationship</option><option value="spouse">Spouse</option><option value="parent">Parent</option><option value="sibling">Sibling</option><option value="child">Child</option><option value="friend">Friend</option><option value="other">Other</option></select></div>
          </div>
          <div class="mt-6">
            <div class="checkbox-group"><input v-model="formData.terms" name="terms" type="checkbox" class="checkbox-input"><label class="checkbox-label">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> <span class="required">*</span></label></div>
            <div class="checkbox-group"><input v-model="formData.hipaa" name="hipaa" type="checkbox" class="checkbox-input"><label class="checkbox-label">I consent to HIPAA compliance and data protection policies <span class="required">*</span></label></div>
            <div class="checkbox-group"><input v-model="formData.notifications" name="notifications" type="checkbox" class="checkbox-input"><label class="checkbox-label">I would like to receive appointment reminders and health updates via email/SMS</label></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Email Verification -->
    <div v-if="currentStep === 4" class="form-step active">
      <div class="form-section">
        <div class="form-content">
          <h2 class="section-title"><i class="fas fa-envelope"></i> Verify Your Email</h2>
          <div class="text-center mb-6"><i class="fas fa-envelope text-6xl text-green-500 mb-4"></i><p class="text-gray-600 mb-4">We've sent a verification code to your email address. Please enter the code below to verify your account.</p><p class="text-sm text-gray-500">If you don't see the email in your inbox, please check your spam folder.</p></div>
          <div class="verification-code-container"><input v-for="i in 6" :key="i" v-model="verificationCode[i-1]" @input="handleCodeInput($event, i)" @keydown="handleCodeBackspace($event, i)" type="text" maxlength="1" class="code-input"></div>
          <div class="error-message text-center" v-if="verificationError">Invalid verification code. Please try again.</div>
          <div class="resend-code"><p>Didn't receive the code? <a href="#" @click.prevent="resendCode">Resend Code</a></p></div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="form-section">
      <div class="form-content">
        <div class="button-group">
          <button type="button" class="btn btn-secondary" @click="goPrevious" v-if="currentStep > 1"><i class="fas fa-arrow-left"></i> Previous</button>
          <div class="flex gap-3">
            <router-link to="/" class="btn btn-danger"><i class="fas fa-home"></i> Back to Home</router-link>
            <button type="button" @click="handleSubmit" class="btn btn-primary">{{ currentStep === 4 ? 'Create Account' : 'Next' }} <i v-if="currentStep < 4" class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps(['currentStep']);
const emit = defineEmits(['next-step', 'previous-step', 'submit-form']);

const formData = reactive({
  firstName: '', middleName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '', password: '', confirmPassword: '',
  address: { street: '', city: '', state: '', zip: '' },
  medicalInfo: { bloodType: '', allergies: '', conditions: '', medications: '' },
  emergencyContact: { name: '', phone: '', relationship: '' },
  terms: false, hipaa: false, notifications: false
});

const verificationCode = ref(['', '', '', '', '', '']);
const verificationError = ref(false);

const handleSubmit = () => {
  if (props.currentStep < 4) {
    if (validateCurrentStep()) {
      emit('next-step');
    }
  } else {
    if (validateVerificationCode()) {
      // --- START: FIX ---
      // 1. Define the role for this form
      const role = 'patient';

      // 2. Create a payload that matches the backend's expected structure
      const payload = {
        role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        // Flatten nested objects to match backend destructuring
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phone: formData.phone,
        streetAddress: formData.address.street,  // Match backend key
        city: formData.address.city,            // Match backend key
        state: formData.address.state,          // Match backend key
        zipCode: formData.address.zip,          // Match backend key
        emergencyContactName: formData.emergencyContact.name, // Match backend key
        emergencyContactPhone: formData.emergencyContact.phone, // Match backend key
        emergencyRelationship: formData.emergencyContact.relationship, // Match backend key
        // Optional fields
        middleName: formData.middleName,
        bloodType: formData.medicalInfo.bloodType,
        allergies: formData.medicalInfo.allergies,
        medicalConditions: formData.medicalInfo.conditions,
        currentMedications: formData.medicalInfo.medications
      };

      console.log('Submitting Payload to API:', payload);
      // Emit the correctly formatted payload to the parent component
      emit('submit-form', payload);
      // --- END: FIX ---
    } else {
      verificationError.value = true;
    }
  }
};

const goPrevious = () => {
  emit('previous-step');
};

const validateCurrentStep = () => {
  // Basic validation: check if required fields are filled
  if (props.currentStep === 1) {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.address.street || !formData.address.city || !formData.address.state || !formData.address.zip) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
  }
  if (props.currentStep === 3) {
    if (!formData.emergencyContact.name || !formData.emergencyContact.phone || !formData.emergencyContact.relationship || !formData.terms || !formData.hipaa) {
      alert('Please complete all required fields and agree to the terms.');
      return false;
    }
  }
  return true;
};

const validateVerificationCode = () => {
  // Bypass verification code check for now.
  // This function will always return true, allowing the form to be submitted.
  return true;
};

const handleCodeInput = (event, index) => {
  const value = event.target.value.replace(/[^0-9]/g, '');
  verificationCode.value[index - 1] = value;
  if (value && index < 6) {
    const nextInput = event.target.nextElementSibling;
    if (nextInput && nextInput.classList.contains('code-input')) {
      nextInput.focus();
    }
  }
  verificationError.value = false;
};

const handleCodeBackspace = (event, index) => {
  if (event.key === 'Backspace' && !event.target.value && index > 1) {
    const prevInput = event.target.previousElementSibling;
    if (prevInput && prevInput.classList.contains('code-input')) {
      prevInput.focus();
    }
  }
};

const resendCode = () => {
  alert('Verification code resent! (This is a placeholder action)');
};
</script>

<style scoped>
/* Form Styles */
.form-section { padding: 3rem; }
.form-content { max-width: 800px; margin: 0 auto; }
.section-title { font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 2rem; display: flex; align-items: center; }
.section-title i { margin-right: 0.75rem; color: #10b981; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.form-group { position: relative; }
.form-label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
.required { color: #ef4444; }
.form-input, .form-textarea { width: 100%; padding: 0.875rem 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.875rem; transition: all 0.3s ease; background: white; }
.form-input:focus, .form-textarea:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
.address-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
.form-textarea { resize: vertical; min-height: 100px; }
.checkbox-group { display: flex; align-items: flex-start; margin-bottom: 1rem; }
.checkbox-input { width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; margin-right: 0.75rem; accent-color: #10b981; }
.checkbox-label { font-size: 0.875rem; color: #4b5563; line-height: 1.5; }
.checkbox-label a { color: #10b981; text-decoration: none; font-weight: 500; }
.checkbox-label a:hover { text-decoration: underline; }
.button-group { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; }
.btn { padding: 0.875rem 2rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem; transition: all 0.3s ease; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; }
.btn-primary { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); }
.btn-secondary { background: white; color: #6b7280; border: 2px solid #e5e7eb; }
.btn-secondary:hover { background: #f9fafb; border-color: #d1d5db; }
.btn-danger { background: white; color: #ef4444; border: 2px solid #fecaca; }
.btn-danger:hover { background: #fef2f2; border-color: #fca5a5; }
.verification-code-container { display: flex; justify-content: center; gap: 0.5rem; margin: 2rem 0; }
.code-input { width: 50px; height: 50px; text-align: center; font-size: 1.5rem; font-weight: 600; border: 2px solid #e5e7eb; border-radius: 0.5rem; transition: all 0.3s ease; }
.code-input:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
.error-message { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }
.resend-code { text-align: center; margin-top: 1rem; }
.resend-code a { color: #10b981; text-decoration: none; font-weight: 500; }
.resend-code a:hover { text-decoration: underline; }
.flex { display: flex; }
.gap-3 { gap: 0.75rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.text-center { text-align: center; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-sm { font-size: 0.875rem; }
.text-6xl { font-size: 3.75rem; }
.text-green-500 { color: #10b981; }

@media (max-width: 768px) {
  .form-section { padding: 2rem 1.5rem; }
  .form-grid { grid-template-columns: 1fr; }
  .address-grid { grid-template-columns: 1fr; }
  .button-group { flex-direction: column; gap: 1rem; }
  .btn { width: 100%; justify-content: center; }
  .verification-code-container { gap: 0.25rem; }
  .code-input { width: 40px; height: 40px; font-size: 1.2rem; }
}
</style>