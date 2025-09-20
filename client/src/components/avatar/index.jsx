
import './index.scss'
const bgByLetter = {
    A: { bgColor: "blanchedAlmond", color: "black" },
    B: { bgColor: "cadetBlue", color: "white" },
    C: { bgColor: "chocolate", color: "white" },
    D: { bgColor: "darkOliveGreen", color: "white" },
    E: { bgColor: "darkSalmon", color: "black" },
    undefined: { bgColor: 'gainsBoro', color: "black" },
}

const Avatar = ({ name }) => {
    const firstLetter = name?.[0];
    return <div className="badge-icon" style={{ backgroundColor: bgByLetter[firstLetter].bgColor, color: bgByLetter[firstLetter].color }}>{firstLetter || 'U'}</div>
}

export default Avatar;