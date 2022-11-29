import { useEffect, useState } from "react"

const Connecting = () => {
    const [dots, setDots] = useState(".")

    useEffect(() => {
        setTimeout(() => {
            if (dots.length < 3) {
                setDots(dots + ".")
            } else {
                setDots("")
            }
        }, 500)
    }, [dots])
    return <h1>{"Connecting" + dots} </h1>
}
export default Connecting