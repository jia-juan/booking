import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export const notificationTypes = {
    success: {
      icon: CheckCircleIcon,
      defaultTitle: 'Successfully saved!',
      defaultMessage: 'Anyone with a link can now view this file.',
      iconColor: 'text-green-400'
    },
    warning: {
      icon: ExclamationCircleIcon,
      defaultTitle: 'Warning!',
      defaultMessage: 'There might be some issues.',
      iconColor: 'text-yellow-400'
    },
    failed: {
      icon: XCircleIcon,
      defaultTitle: 'Failed!',
      defaultMessage: 'Something went wrong.',
      iconColor: 'text-red-400'
    }
  }
  