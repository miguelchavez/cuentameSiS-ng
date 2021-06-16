import React from 'react'
import { Switch, SwitchLabel, SwitchRadio, SwitchSelection } from './multiswitch_styles.js'
import { useState, useEffect } from 'react'

const titleCase = (str) => {
    return str
        .split(/\s+/)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' ')
}

const MultiSwitch = ({ values, selected: selection, onChange }) => {
    const [selected, setSelected] = useState(selection)
    const [selectedValue, setSelectedValue] = useState(selection.value || 'Auto')
    const [selectedIcon, setSelectedIcon] = useState(selection.icon)

    const ClickableLabel = ({ title, icon, onChange, id }) => {
        return (
            <SwitchLabel onClick={() => onChange(title)} className={id}>
                {icon}
            </SwitchLabel>
        )
    }

    const ConcealedRadio = ({ value, selected }) => {
        return <SwitchRadio type='radio' name='switch' checked={selected === value} />
    }

    useEffect(() => {
        setSelectedIcon(selected.icon)
        setSelectedValue(selected.value)
    }, [selected])

    const handleChange = (val) => {
        // item es el value de {icon:i, value:v}
        const selectedItemIndex = values.map((i) => i.value).indexOf(val)
        const item = values[selectedItemIndex]
        setSelected(item)
        onChange(item.value)
    }

    const selectionStyle = () => {
        const selectedItemIndex = values.map((i) => i.value).indexOf(selectedValue)
        return {
            left: `${(selectedItemIndex / 3) * 100}%`,
        }
    }

    return (
        <Switch>
            {values.map((item) => {
                return (
                    <span key={item.value}>
                        <ConcealedRadio value={item.value} selected={item.value} />
                        <ClickableLabel title={item.value} icon={item.icon} onChange={handleChange} />
                    </span>
                )
            })}
            <SwitchSelection style={selectionStyle()} />
        </Switch>
    )
}

export default MultiSwitch
