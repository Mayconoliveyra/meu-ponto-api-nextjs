const moment = require("moment/moment")
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs

const dias = ["domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
function formatDia(str) {
    const dataf = moment(str).format('L')
    var partes = dataf.split('/').map(Number);
    var data = new Date('20' + partes[2], partes[1] - 1, partes[0]);
    var diaSemana = dias[data.getDay() % 7];

    return `${moment(str).format('DD')}- ${diaSemana.slice(0, 3)}`
}
function horaForm(hr) {
    if (!hr) return ""
    const tamanho = hr.length


    if (tamanho == 9) return hr.slice(0, 6)
    if (tamanho == 8) return hr.slice(0, 5)

    return hr
}

async function pontosPDF(data) {
    const tbody = []
    for await (let ponto of data.tbody) {
        const rows = [];

        rows.push({ text: formatDia(ponto.data), alignment: 'left', margin: [5, 3, 0, 0] })
        /* Só vai existir valor no 'dif_total', se tiver registrado os 4 pontos(entrada1,saida1,entrada2,saida2) */
        /* Se tiver valor sera exibido os dados das coluna, caso contrario ficara coluna em branco */
        if (ponto.dif_total) {
            rows.push({ text: horaForm(ponto.entrada1), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.saida1), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.e1_s1), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.entrada2), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.saida2), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.e2_s2), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.acrescentar_hrs), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.subtrair_hrs), margin: [0, 3, 0, 0] })
            rows.push({ text: horaForm(ponto.dif_total), margin: [0, 3, 0, 0] })
        } else {
            rows.push({ text: horaForm(ponto.obs), border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, false, true], margin: [0, 3, 0, 0] })
            rows.push({ text: "", border: [false, true, true, true], margin: [0, 3, 0, 0] })
        }

        tbody.push(rows)
    }

    const docDefinition = {
        info: {
            title: `${data.thead.mes} ${data.thead.funcionario.toUpperCase()}`,
        },
        pageSize: 'A4',
        pageMargins: [10, 10, 10, 10],
        content: [
            { text: 'Registro de Frequência', style: 'headerTitulo' },
            {
                style: { lineHeight: 3, fontSize: 8 },
                columns: [
                    {
                        width: '*',
                        text: `Mês: ${data.thead.mes}`
                    },
                    {
                        width: '*',
                        text: `Funcionário: ${data.thead.funcionario}`
                    },
                ]
            },
            {
                table: {
                    widths: [40, 45, 45, 30, 45, 45, 30, 45, 45, '*'],
                    body: [
                        [
                            { text: 'DIA', bold: true, border: [true, true, true, false], margin: [0, 3, 0, 0] },
                            { text: '1º TURNO', bold: true, colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            { text: '2º TURNO', bold: true, colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            { text: 'EXTRA', bold: true, colSpan: 2, margin: [0, 3, 0, 0] },
                            {},
                            { text: 'B. H.', bold: true, border: [true, true, true, false], margin: [0, 3, 0, 0] }
                        ],
                        [
                            { text: '', border: [true, false, true, true], margin: [0, 3, 0, 0] },

                            { text: 'ENTRADA', margin: [0, 3, 0, 0] },
                            { text: 'SAÍDA', margin: [0, 3, 0, 0] },
                            { text: '=', margin: [0, 3, 0, 0] },

                            { text: 'ENTRADA', margin: [0, 3, 0, 0] },
                            { text: 'SAÍDA', margin: [0, 3, 0, 0] },
                            { text: '=', margin: [0, 3, 0, 0] },

                            { text: 'ADD H (+)', margin: [0, 3, 0, 0] },
                            { text: 'SUB H (-)', margin: [0, 3, 0, 0] },

                            { text: '', border: [true, false, true, true], margin: [0, 3, 0, 0] }
                        ],

                        ...tbody

                        , [
                            { text: '', bold: true, colSpan: 10, margin: [0, 15, 0, 0], border: [false, false, false, false] },

                            {},
                            {},
                            {},

                            {},
                            {},
                            {},

                            {},
                            {},

                            {}
                        ],

                        [
                            { text: 'RESUMO GERAL', bold: true, colSpan: 10, margin: [0, 3, 0, 0] },

                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {}
                        ],
                        [
                            { text: 'BANCO HORAS', colSpan: 4, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            {},
                            { text: 'ADD H (+)', colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            { text: 'SUB H (-)', colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                        ],
                        [
                            { text: horaForm(data.tfoot.banco_horas), colSpan: 4, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            {},
                            { text: horaForm(data.tfoot.banco_add), colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                            { text: horaForm(data.tfoot.banco_subtrair), colSpan: 3, margin: [0, 3, 0, 0] },
                            {},
                            {},
                        ],
                    ],

                }
            },
        ],
        defaultStyle: {
            fontSize: 7,
            alignment: 'center',
            lineHeight: 1.3
        },
        styles: {
            headerTitulo: {
                fontSize: 9,
                alignment: 'center',
                lineHeight: 2
            },
        }
    };

    pdfMake.createPdf(docDefinition).open();
}

export default pontosPDF;