import styled from "styled-components"
const BotaoSC = styled.div`
    a, button{   
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            color: #ffffff;
            border-radius: 2px;
            padding: 0.5rem 1rem;
            box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);
 
            &:disabled{
                cursor: default;
            }
            svg{
                margin-right: 4px;
            }

            height:${({ height }) => height} !important;
            max-height: ${({ maxheight }) => maxheight} !important;
            width:${({ width }) => width} !important;
            max-width: ${({ maxwidth }) => maxwidth} !important;
            margin:${({ margin }) => margin} !important;
            padding:${({ padding }) => padding} !important;
            background:${({ background }) => background} !important;
            color:${({ color }) => color} !important;
            font-size:${({ fontsize }) => fontsize} !important;
            font-weight:${({ fontweight }) => fontweight} !important;
            border:${({ border }) => border} !important;
            border-radius:${({ borderadius }) => borderadius} !important;
            box-shadow:${({ boxshadow }) => boxshadow} !important;
    }
`

const BotaoVerdeSC = styled(BotaoSC)`
    a, button{   
            background-color: #198754;
            border-color: #198754;
            &:hover{
                background-color: #157347;
                border-color: #146c43;
            }
    }
`
const BotaoPretoSC = styled(BotaoSC)`
    a, button{  
            background-color: #212529;
            border-color: #212529;
            &:hover{
                background-color: #424649;
                border-color: #373b3e;
            }
    }
`
const BotaoVermelhoSC = styled(BotaoSC)`
    a, button{  
            background-color: #dc3545;
            border-color: #dc3545;
            &:hover{
                background-color: #bb2d3b;
                border-color: #b02a37;
            }
    }
`
const BotaoLaranjaSC = styled(BotaoSC)`
    a, button{  
            background-color: #ffc107;
            border-color: #ffc107;
            &:hover{
                background-color: #ffca2c;
                border-color: #ffc720;
            }
    }
`
const BotaoAzulSC = styled(BotaoSC)`
    a, button{  
            background-color: #0dcaf0;
            border-color: #0dcaf0;
            &:hover{
                background-color: #31d2f2;
                border-color: #25cff2;
            }
    }
`

const BotaoVerde = ({ children, height, maxheight, width, maxwidth, margin, padding, background, color, fontsize, fontweight, border, borderadius, boxshadow }) => {
    return (
        <BotaoVerdeSC
            height={height} maxheight={maxheight}
            width={width} maxwidth={maxwidth}
            margin={margin} padding={padding}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            border={border} borderadius={borderadius}
            boxshadow={boxshadow}
        >
            {children}
        </BotaoVerdeSC>
    )
}
const BotaoPreto = ({ children, height, maxheight, width, maxwidth, margin, padding, background, color, fontsize, fontweight, border, borderadius, boxshadow }) => {
    return (
        <BotaoPretoSC
            height={height} maxheight={maxheight}
            width={width} maxwidth={maxwidth}
            margin={margin} padding={padding}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            border={border} borderadius={borderadius}
            boxshadow={boxshadow}
        >
            {children}
        </BotaoPretoSC>
    )
}
const BotaoVermelho = ({ children, height, maxheight, width, maxwidth, margin, padding, background, color, fontsize, fontweight, border, borderadius, boxshadow }) => {
    return (
        <BotaoVermelhoSC
            height={height} maxheight={maxheight}
            width={width} maxwidth={maxwidth}
            margin={margin} padding={padding}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            border={border} borderadius={borderadius}
            boxshadow={boxshadow}
        >
            {children}
        </BotaoVermelhoSC>
    )
}
const BotaoLaranja = ({ children, height, maxheight, width, maxwidth, margin, padding, background, color, fontsize, fontweight, border, borderadius, boxshadow }) => {
    return (
        <BotaoLaranjaSC
            height={height} maxheight={maxheight}
            width={width} maxwidth={maxwidth}
            margin={margin} padding={padding}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            border={border} borderadius={borderadius}
            boxshadow={boxshadow}
        >
            {children}
        </BotaoLaranjaSC>
    )
}
const BotaoAzul = ({ children, height, maxheight, width, maxwidth, margin, padding, background, color, fontsize, fontweight, border, borderadius, boxshadow }) => {
    return (
        <BotaoAzulSC
            height={height} maxheight={maxheight}
            width={width} maxwidth={maxwidth}
            margin={margin} padding={padding}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            border={border} borderadius={borderadius}
            boxshadow={boxshadow}
        >
            {children}
        </BotaoAzulSC>
    )
}

export { BotaoVerde, BotaoPreto, BotaoVermelho, BotaoLaranja, BotaoAzul }