import styled from "styled-components"
import { ExclamationTriangle } from "react-bootstrap-icons"

const TabelaForm = styled.div`
    display: flex;
    padding: 15px 15px;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    table {
        width: 100%;
        display: flex;
        flex-direction: column;

        tbody, thead {
            display: flex;
            flex-direction: column;
            border: 1px solid #dddddd;
            border-bottom: none;
            border-spacing: 0;
            background-color: #ffffff;
        }
        tbody{
            height: 100%;
        }
        tr{
            display: flex;
            td,th{
                display: flex;
                height: 37px;
                flex: 1;
                padding: 0 5px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                text-align: left;
                font-size: 12px;
            }
            td:last-child{
                border-right: none;
            }
            th:last-child{
                border-right: none;
            }
        }
        tr:nth-child(odd) {
            background-color: #f3f4f5;
        }
        tr:hover{
            background-color: #DDDDDD !important;
        }
    }
    @media (max-width: 720px){
        padding: 5px;
    }
`
const ThForm = styled.th`
    padding: 8px 5px;
    max-width: 200px;
    align-items: center;
    background-color: #ffffff;
    color: #333333;
    border-bottom-width: 2px;

    span,a{
        box-sizing: border-box;
        color: #333333;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        svg{
            margin-bottom:3px;
        }
    }

    max-width: ${({ maxwidth }) => maxwidth} !important;
    min-width: ${({ minwidth }) => minwidth} !important;
    padding:${({ padding }) => padding} !important;
    background:${({ background }) => background} !important;
    color:${({ color }) => color} !important;
    font-size:${({ fontsize }) => fontsize} !important;
    font-weight:${({ fontweight }) => fontweight} !important;
`
const TdFormSC = styled.td`
    align-items: center;
    max-width: 200px;
    .span{
        text-overflow: ellipsis;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        line-height: 14px;
    }
    .acoes{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    max-width: ${({ maxwidth }) => maxwidth} !important;
    min-width: ${({ minwidth }) => minwidth} !important;
    padding:${({ padding }) => padding} !important;
    background:${({ background }) => background} !important;
    color:${({ color }) => color} !important;
    font-size:${({ fontsize }) => fontsize} !important;
    font-weight:${({ fontweight }) => fontweight} !important;
`
/* Tabela de visualização de dados */
const TableVWSC = styled.div`
    display: flex;
    padding: 20px 15px;
    @media (max-width: 720px){
        padding: 13px 5px;
    }
    table {
        color: #333333 !important;
        width: 100%;
        display: flex;
        flex-direction: column;
        tbody, thead {
            display: flex;
            flex-direction: column;
            border: 1px solid #dddddd;
            border-bottom: none;
            border-spacing: 0;
            background-color: #ffffff;
        }
        tbody{
            overflow-x: hidden;
            height: 100%;
        }
        tr{
            display: flex;
            td,th{
                display: flex;
                align-items: center;
                height: 37px;
                flex: 1;
                padding: 0 10px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                font-size: 13px;
                @media (max-width: 720px){
                    font-size: 11px;
                }

                .span-th-vw{
                    font-weight: normal;
                    font-family:${({ theme }) => theme.font.family.bold};
                    text-overflow: ellipsis;
                    white-space: normal;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-word;
                }
                .span-td-vw{
                    text-overflow: ellipsis;
                    white-space: normal;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-word;
                }
            }
            th{
                max-width: 200px;
            }
            td:last-child{
                border-right: none;
            }
        }
    }
`
const PaginadorForm = styled.div`
    padding: 10px 15px;
    float: right;
    a{
        margin-top: 3px;
        background: #fafafa;
        color: #666;
        box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        border: 1px solid #dddddd;
    }
    .active{
        background-color: #0C1B25;
        color: #ffffff;
        cursor: default;
    } 
`
const VazioForm = styled.div`
    flex: 1;
    display: flex;
    padding: 7px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    text-align: center;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    margin-top: 10px;
    color: #AAAAAA;
    .icon-vazio{
        display: flex;
        flex-direction: column;
    }
    h3{
        margin-top: 10px;
    }
`
const TableVW = ({ children }) => {
    return (
        <TableVWSC>
            {children}
        </TableVWSC>
    )
}
const ThOne = ({ children, maxwidth, minwidth, padding, background, color, fontsize, fontweight }) => {
    return (
        <ThForm
            padding={padding}
            maxwidth={maxwidth} minwidth={minwidth}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
        >
            <span>{children}</span>
        </ThForm>
    )
}
const TdForm = ({ children, maxwidth, minwidth, padding, background, color, fontsize, fontweight, element }) => {
    return (
        <TdFormSC
            padding={padding}
            maxwidth={maxwidth} minwidth={minwidth}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            element={element}
        >
            {!element && (
                <span className="span">{children}</span>
            )}
            {element == "acoes" && (
                <div className="acoes">{children}</div>
            )}
        </TdFormSC>
    )
}

export { TabelaForm, ThForm, TdForm, ThOne, TableVW, PaginadorForm, VazioForm }