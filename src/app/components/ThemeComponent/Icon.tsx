import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const Icon = ({ children }) => {

    const [iconColor, setIconColor] = useState()
    const { theme, primaryColor, secondaryColor, defaultColor } = useTheme()

    useEffect(() => {
        if(theme === 'custom'){
            setIconColor(primaryColor)
        } else {
            setIconColor(defaultColor)
        }

    },[theme, primaryColor, secondaryColor, defaultColor])

    return (
        <div style={{color: iconColor}}>
            {children}
        </div>  
    )
}

export default Icon