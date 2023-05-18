
export type WalletAssets = {
    stockshare: BasicAsset[],
    realestate: BasicAsset[]
}

export type ConsolidatedAsset = {
    "realestate": ConsolidatedAssetItem,
    "stockshare": ConsolidatedAssetItem,
    "total": ConsolidatedAssetItem
}
export type ConsolidatedAssetItem = {
    current: number,
    price: number,
    discounted_price: number,
    earnings: number,
    balance: number,
    discounted_balance: number
}

export type BasicAsset = {
    "asset_id": number,
    "asset_code": string,
    "asset_name": string,
    "asset_type": string,
    "created_at": string,
    "user": number,
    "total_price": number,
    "total_quantity": number,
    "average_price": number,
    "current_price": number,
    "current_total": number,
    "balance": number,
    "balance_with_earnings": number,
    "discounted_price": number,
    "discounted_average_price": number,
    "earnings_received": number
}

export type BasicAssetSortKeys = {
    "total_price": number,
    "total_quantity": number,
    "average_price": number,
    "current_price": number,
    "current_total": number,
    "balance": number,
    "balance_with_earnings": number,
    "discounted_price": number,
    "discounted_average_price": number,
    "earnings_received": number
}

export type Query = {
    orderBy?: string
    direction?: string
    search?: string
    limit: number
    offset: number
    type?: string
    assetId?: number
}

export type Operation = {
    "operation_id": number,
    "quantity": number,
    "operation_price": number,
    "operation_type": 'bought' | 'sold',
    "operation_date": string,
    "created_at": Date,
    "asset_code": string,
    "asset_type": string,
    "volume": number,
    "asset"?: number | SimpleAsset
}

export type OperationsResponse = {
    operations: Operation[],
    count: number
}

export type EarningResponseType = {
    earnings: Earning[],
    count: number
}

export type EarningsByMonth = {
    month: number,
    year: number
    total_earning: number
}

export type ChartDataType = Array<string | number>

export type SimpleAsset = {
    "asset_id": number,
    "asset_code": string,
    "asset_name": string,
    "asset_type": "stockshare" | "realestate",
    "created_at": Date,
    "user": {
        "id": number,
        "username": string
    }
}

export type FormStatus = {
    type: string,
    edit: boolean
}

export type PostOperation = {
    operation: NewOperation,
    asset: NewOperationAsset,
    operation_id?: number
}

export type PartialPostOperation = {
    operation: Partial<NewOperation>,
    asset: Partial<NewOperationAsset>
}

export type EditOperation = {
    operation: NewOperation,
    id?: number
}
export type PartialEditOperation = {
    operation: Partial<NewOperation>
}
export type NewOperation = {
    quantity: number,
    operation_price: number,
    operation_type: string,
    operation_date: string
}

export type NewOperationAsset = {
    asset_code: string,
    asset_name: string,
    asset_type: string
}

/* USER */
export type User = {
    email?: string;
    username?: string;
    name?: string;
    surname?: string;
    assets?: number;
    isAuthenticated?: boolean;
    userPicture: string | null
}

export type UserForm = {
    name: string,
    surname: string,
    email: string,
    password: string
}
export type LoginOutput = {
    user: User,
    accessToken: string
}
export type LoginInput = {
    email: string,
    password: string
}

/* EARNING */
export type Earning = {
    "asset_code": string,
    "earning_id": number,
    "earning_type": string,
    "earning_value": number,
    "earning_date": Date,
    "created_at": Date,
    "asset": number
}

export type PostEarning = {
    "earning": NewEarning,
    "asset_id": number,
    "earning_id"?: number
}

export type PartialPostEarning = {
    "earning": Partial<NewEarning>,
    "asset_id": number,
    "earning_id"?: number
}
export type NewEarning = {
    "earning_type": string,
    "earning_date": string,
    "earning_value": number
}
