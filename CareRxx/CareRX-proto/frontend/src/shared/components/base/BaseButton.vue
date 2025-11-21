<template>
  <button 
    :class="buttonClass" 
    @click="$emit('click')"
    :disabled="disabled"
  >
    <i v-if="icon" :class="icon"></i>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'outline', 'white', 'danger', 'success'].includes(value)
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    buttonClass() {
      return [
        'btn',
        `btn-${this.type}`,
        `btn-${this.size}`,
        { 'btn-disabled': this.disabled }
      ]
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
}

.btn-small {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-large {
  padding: 20px 40px;
  font-size: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
}

.btn-outline {
  background-color: transparent;
  color: #10b981;
  border: 2px solid #10b981;
}

.btn-outline:hover {
  background-color: #10b981;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.btn-white {
  background-color: white;
  color: #10b981;
}

.btn-white:hover {
  background-color: #f9fafb;
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(255,255,255,0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

.btn-success:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-disabled:hover {
  transform: none;
  box-shadow: none;
}
</style>