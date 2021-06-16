import styled from 'styled-components'

export const Switch = styled.div`
    font-family: 'Lucida Grande', Tahoma, Verdana, sans-serif;
    position: relative;
    height: 26px;
    width: 100px;
    margin-top: 8px;
    padding: 1px;
    padding-top: 3px;
    background-color: #fff0;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
`

export const SwitchRadio = styled.input`
    display: none;
`

export const SwitchSelection = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 32px;
    height: 26px;
    background: #ff5953;
    border-radius: 4px;
    transition: left 0.25s ease-out;
`

export const SwitchLabel = styled.label`
    position: relative;
    z-index: 2;
    float: left;
    width: 32px;
    line-height: 26px;
    font-size: 11px;
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
    cursor: pointer;

    ${SwitchRadio}:checked + & {
        transition: 0.15s ease-out;
        color: #fff;
    }
`
