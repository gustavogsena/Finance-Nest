export function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date: string) => {
    const data = new Date(date)
    const ano = data.getFullYear()
    const mes = padTo2Digits(data.getMonth() + 1)
    const dia = padTo2Digits(data.getDate())
    return `${ano}-${mes}-${dia}`
}


export const formatCurrency = (value: number | string) => {
    if (typeof value === 'string') {
        value = parseFloat(value.replace(',', '.').replace(' ', ''))
    }
    const currency = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)

    return currency
}

export const calculateDiferencePercentage = (v1: number, v2: number) => {
    const result = (v1 - v2) * 100 / v2
    return Number(result.toFixed(2))
}