import { useEffect, useRef } from "react";

const useClickOutside = () => {
    const myRef = useRef([]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.some((el) => el.contains(event.target))) {
                setShowMenu(null); // close when clicking outside
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [myRef]);

    return { myRef }
}

export default useClickOutside;