import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
    const myRef = useRef([]);
    console.log(myRef.current);
    
    useEffect(() => {
        function handleClickOutside(event) {
            const clickedInside = myRef.current.some(
                (el) => el && el.contains(event.target)
            );

            if (!clickedInside) {
                console.log("Clicked outside all items!");
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [myRef, handler]);

    return { myRef }
}

export default useClickOutside;