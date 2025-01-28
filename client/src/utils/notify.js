import toast from 'react-hot-toast';

export function notify(message) {
  toast(message, {
    duration: 5000,
    position: 'top-right',
  });
}
