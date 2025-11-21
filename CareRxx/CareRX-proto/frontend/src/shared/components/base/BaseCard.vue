<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    padding: {
      type: String,
      default: 'medium',
      validator: value => ['none', 'small', 'medium', 'large'].includes(value)
    },
    rounded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cardClass() {
      return [
        'card',
        { 
          'card-shadow': this.shadow,
          'card-bordered': this.bordered,
          'card-rounded': this.rounded
        },
        `card-padding-${this.padding}`
      ]
    }
  }
}
</script>

<style scoped>
.card {
  background-color: white;
  transition: all 0.3s;
}

.card-shadow {
  box-shadow: var(--card-shadow);
}

.card-shadow:hover {
  box-shadow: var(--card-hover-shadow);
}

.card-bordered {
  border: 1px solid #e5e7eb;
}

.card-rounded {
  border-radius: 12px;
}

.card-padding-none {
  padding: 0;
}

.card-padding-small {
  padding: 16px;
}

.card-padding-medium {
  padding: 24px;
}

.card-padding-large {
  padding: 32px;
}

.card-header {
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
  font-weight: 600;
  color: var(--secondary-color);
}

.card-body {
  flex: 1;
}

.card-footer {
  border-top: 1px solid #e5e7eb;
  padding: 16px 24px;
  background-color: #f9fafb;
  border-radius: 0 0 12px 12px;
}
</style>