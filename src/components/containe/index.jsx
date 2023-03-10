import styled from "styled-components"

const ContentSC = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    
    background-color:${({ background }) => background};
    width:${({ width }) => width};
    height:${({ height }) => height};
    max-width: ${({ maxwidth }) => maxwidth};
    max-height: ${({ maxheight }) => maxheight};
    margin:${({ margin }) => margin};
    padding:${({ padding }) => padding};
    border:${({ border }) => border};
`

export const Container = ({ children, height, width, maxwidth, maxheight, margin, padding, background, border }) => {
    return (
        <ContentSC
            height={height}
            width={width}
            maxwidth={maxwidth}
            maxheight={maxheight}
            margin={margin}
            padding={padding}
            background={background}
            border={border} >
            {children}
        </ContentSC>
    )
}