<template>
  <div class="input-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <i v-if="icon" :class="icon" class="input-icon"></i>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClass"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    id() {
      return `input-${Math.random().toString(36).substring(2, 9)}`
    },
    inputClass() {
      return [
        'input-field',
        `input-${this.size}`,
        { 'input-error': this.error, 'input-with-icon': this.icon }
      ]
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--secondary-color);
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-text);
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  font-family: 'Montserrat', sans-serif;
}

.input-small {
  padding: 8px 12px;
  font-size: 14px;
}

.input-large {
  padding: 16px 20px;
  font-size: 18px;
}

.input-with-icon {
  padding-left: 45px;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.input-error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 14px;
  margin-top: 0.25rem;
}
</style>