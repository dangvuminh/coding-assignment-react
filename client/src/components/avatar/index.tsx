import './index.scss';
const bgByLetter = {
  A: { bgColor: 'blanchedAlmond', color: 'black' },
  B: { bgColor: 'cadetBlue', color: 'white' },
  C: { bgColor: 'chocolate', color: 'white' },
  D: { bgColor: 'darkOliveGreen', color: 'white' },
  E: { bgColor: 'darkSalmon', color: 'black' },
};

type LetterType = keyof typeof bgByLetter;

const Avatar = ({ name }: { name?: string }) => {
  const firstLetter = name?.[0] as LetterType;
  return (
    <div
      className="badge-icon"
      style={{
        backgroundColor: bgByLetter[firstLetter]?.bgColor || 'gainsboro',
        color: bgByLetter[firstLetter]?.color || 'black',
      }}
    >
      {firstLetter || 'U'}
    </div>
  );
};

export default Avatar;
