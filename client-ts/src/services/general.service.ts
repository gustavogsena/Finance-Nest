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


export const formatCurrency = (value: number) => {
    const currency = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)

    return currency
}