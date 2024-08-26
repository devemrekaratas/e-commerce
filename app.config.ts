export default defineAppConfig({
  ui: {
    primary: 'zinc',
    button: {
      rounded: 'rounded-none'
    },
    buttonGroup: {
      rounded: 'rounded-none'
    },
    badge: {
      rounded: 'rounded-none'
    },
    input: {
      rounded: 'rounded-none'
    },
    dropdown: {
      rounded: 'rounded-none',
      item: {
        rounded: 'rounded-none'
      }
    },
    avatar: {
      rounded: 'rounded-none',
      background: 'bg-gray-900 dark:bg-white',
      placeholder: 'text-white dark:text-black'
    },
    modal: {
      rounded: 'rounded-none'
    },
    commandPalette: {
      group: {
        command: {
          base: 'rounded-none'
        }
      }
    },
    tooltip:{
      rounded: 'rounded-none'
    },
    breadcrumb:{
      li:'text-black dark:text-white',
      default:{
        divider:'i-material-symbols:chevron-right'
      }
    },
    select:{
      rounded: 'rounded-none',
      color:{
        white:{
          outline:'dark:bg-black'
        }
      },
      default:{
        trailingIcon:'i-material-symbols:keyboard-arrow-down'
      }
    },
    selectMenu:{
      rounded: 'rounded-none',
      background:'dark:bg-black',
      option:{
        rounded: 'rounded-none'
      },
    },
    pagination:{
      rounded: 'first:rounded-none last:rounded-none',
      default:{
        prevButton:{
          icon:'i-material-symbols:chevron-left'
        },
        nextButton:{
          icon:'i-material-symbols:chevron-right'
        }
      }
    }
  }
})