import Avatar from "react-avatar";

export default function Avatars({ members }) {
  return (
    <div>
      {members.map((member, num) => (
        <Avatar key={num} name={member} maxInitials={2} size="30px" round />
      ))}
    </div>
  );
}
