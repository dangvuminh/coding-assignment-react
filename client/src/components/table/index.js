import { faBook, faCheck, faClose, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import './data-table.scss'
const DataTable = ({ columns, rows, action }) => {

    const menuRef = useRef([]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.some((el) => el.contains(event.target))) {
                setShowMenu(null); // close when clicking outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);
    const [showMenu, setShowMenu] = useState();
    return <table className='data-table'>
        <thead>
            <tr>
                {
                    columns.map((col, index) => {
                        return <th key={index}>{col.label}</th>
                    })
                }

            </tr>
        </thead>
        <tbody>
            {
                rows.map((r, rIndex) => (
                    <tr key={rIndex}>

                        {
                            columns.map((col, colIndex) => {
                                return (col.type && col?.type === 'boolean') ?
                                    <td key={colIndex}>{r[col.field] ? <FontAwesomeIcon icon={faCheck} color='green' /> : <FontAwesomeIcon icon={faClose} color='red' />}</td>
                                    : <td key={colIndex}>
                                        {r[col.field]}
                                    </td>
                            })
                        }
                        {action &&
                            <td style={{ position: 'relative' }}><FontAwesomeIcon icon={faEllipsisH} onClick={() => setShowMenu(r.id)} />
                                <div ref={(ele) => menuRef.current[rIndex] = ele} className="menu-item" style={{ position: 'absolute', top: 0, left: 40, display: showMenu === r.id ? 'block' : 'none', backgroundColor: 'ghostwhite' }}>
                                    <ul style={{ width: '120px', padding: "10px", textAlign: 'start' }}>
                                        {
                                            action.nodes.map((n, nIndex) => {
                                                return <li key={nIndex} onClick={() => {
                                                    n.onClick(r);
                                                }}><FontAwesomeIcon icon={n.icon} /> {n.title}</li>
                                            })
                                        }

                                    </ul>
                                </div>
                            </td>
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
}

export default DataTable;