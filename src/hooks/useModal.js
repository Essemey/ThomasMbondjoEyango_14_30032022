import { useState } from "react";


export function useModal() {

    const [visible, setVisible] = useState(false)


    return [visible, setVisible]
}