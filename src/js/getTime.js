export default function getTime() {
  const moment = new Date();
  const day = moment.toLocaleDateString();
  const time = moment.toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' },
  );

  return `${time} ${day}`;
}
