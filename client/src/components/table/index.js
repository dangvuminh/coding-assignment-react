import { faBook, faCheck, faClose, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import './data-table.scss'
import useClickOutside from "client/src/hooks/useClickOutSide";
const DataTable = ({ columns, rows, action, onRowSelect }) => {
    const {myRef} = useClickOutside();

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
                    <tr key={rIndex} onClick={() => { onRowSelect(r) }}>

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
                            <td style={{ position: 'relative' }}><FontAwesomeIcon icon={faEllipsisH} onClick={(e) => { e.stopPropagation(); setShowMenu(r.id) }} />
                                <div ref={(ele) => myRef.current[rIndex] = ele} className="menu-item" style={{ position: 'absolute', top: 0, left: 40, display: showMenu === r.id ? 'block' : 'none', backgroundColor: 'white', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.15)', borderRadius: "6px", zIndex: 99 }}>
                                    <ul style={{ width: '150px', padding: "5px 10px", textAlign: 'start' }}>
                                        {
                                            action.nodes.map((n, nIndex) => {
                                                return <li style={{ listStyleType: 'none', paddingBottom: 5 }} key={nIndex} onClick={(e) => {
                                                    e.stopPropagation();
                                                    n.onClick(r);
                                                    setShowMenu(false);
                                                }}><FontAwesomeIcon icon={n.icon(r)} /> {n.title(r)}</li>
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