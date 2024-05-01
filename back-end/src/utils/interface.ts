import { LicenseCategory, Role, Fuel, TypeVehicle, PlanPeriodicity, PaymentMethod } from './enum'

interface ILogin {
    email: string;
    password: string;
}

interface IGenerateRefreshToken {
    refreshToken: string;
}

interface ICreateTokenUser {
    id: string;
    email: string;
    role: string;
    fullname: string;
    isActive: boolean;
}

interface ICreateUser {
    fullname: string;
    email: string;
    documentNumber: string;
    password: string;
    confirmPassword: string;
    role: Role;
    unitsIds: string[];
}

interface IEditUser {
    fullname: string;
    email: string;
    documentNumber: string;
    role: Role;
    unitsIds: string[];
}

interface IEditPasswordUser {
    password: string;
    confirmPassword: string;
}

interface IEditProfile {
    fullname: string;
    email: string;
    documentNumber: string;
    role: Role;
}

interface IEditPasswordProfile {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string
}

interface IAddress {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface IIdentityDocument {
    identityNumber: string;
    expeditionOrgan: string;
    expeditionDate: string;
    birthDate: string;
    UF: string;
}

interface ILicenseDocument {
    licenseNumber: string;
    licenseCategory: LicenseCategory;
}

interface ICreateClient {
    documentNumber: string;
    fullname: string;
    email: string;
    telephone: string;
    mobilephone: string;
    indication: string;
    address: IAddress;
    identityDocument: IIdentityDocument;
    licenseDocument: ILicenseDocument;
    businessUnitId: string;
}

interface IEditClient {
    documentNumber: string;
    fullname: string;
    email: string;
    telephone: string;
    mobilephone: string;
    indication: string;
    address: IAddress;
    identityDocument: IIdentityDocument;
    licenseDocument: ILicenseDocument;
    businessUnitId: string;
}

interface ICreateClientGalaxyPay {
    id: string;
    fullname: string;
    documentNumber: string;
    email: string;
    mobilephone: string;
    address: IAddress;
}

interface ITokenGalaxyPayResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

interface ICreateBusinessUnit {
    corporateName: string;
    documentNumber: string;
    address: IAddress;
}

interface IEditBusinessUnit {
    corporateName: string;
    documentNumber: string;
    address: IAddress;
}

interface IVehicleConditions {
    dentedTank: boolean;
    brokenExhaust: boolean;
    goodCondition: boolean;
    damagedTaillights: boolean;
    damagedHeadlights: boolean;
}

interface ISecondDriverVehicle {
    documentNumber: string;
    fullname: string;
    kinship: string;
    licenseDocument: ILicenseDocument;
    birthDate: string;
    observations: string;
}

interface ICreateVehicle {
    type: string;
    brand: string;
    model: string;
    yearManufacture: string;
    yearModel: string;
    color?: string;
    chassi: string;
    renavam: string;
    fuel: Fuel;
    clientId: string;
    value: string;
    odometer: string;
    licensePlate: string;
    tracker?: boolean;
    trailer?: boolean;
    alieneted?: boolean;
    bank?: string;
    financedAmount?: string;
    engineCapacity?: string;
    observations?: string;
    isSecondDriver: boolean;
    vehicleOwner?: string;
    documentNumberOwner?: string;
    vehicleConditions?: IVehicleConditions;
    secondDriver?: ISecondDriverVehicle;
}

interface IEditVehicle {
    type: string;
    brand: string;
    model: string;
    yearManufacture: number;
    yearModel: number;
    color?: string;
    chassi: string;
    renavam: string;
    fuel: Fuel;
    clientId: string;
    value: number;
    odometer: number;
    licensePlate: string;
    tracker?: boolean;
    trailer?: boolean;
    alieneted?: boolean;
    bank?: string;
    financedAmount?: number;
    engineCapacity?: number;
    observations?: string;
    isSecondDriver: boolean;
    vehicleOwner?: string;
    documentNumberOwner?: string;
    vehicleConditions?: IVehicleConditions;
    secondDriver?: ISecondDriverVehicle;
}

interface IPlanPrice {
    payment: PaymentMethod;
    value: number;
}

interface ICreatePlan {
    name: string;
    periodicity: PlanPeriodicity;
    quantity: number;
    additionalInfo: string;
    planPrices: IPlanPrice[];
}

interface ICreateEvent {
    description: string;
    type: string;
    occurrenceDateTime: string;
    policeReport: boolean;
    address: IAddress;
    vehicleId: string
}

interface IEditEvent {
    description: string;
    type: string;
    occurrenceDateTime: string;
    policeReport: boolean;
    address: IAddress;
}

interface ICreateContractPay {
    id: string;
    planMyId?: string;
    firstPayDayDate: string;
    additionalInfo?: string;
    clientId: string;
    periodicity?: PlanPeriodicity;
    quantity?: number;
    value?: number;
}

interface ICreateContract {
    vehicleId: string;
    planMyId?: string;
    firstPayDayDate: string;
    additionalInfo: string;
    periodicity?: PlanPeriodicity;
    quantity?: number;
    value?: number;
}

interface IEditContractPay {
    id: string;
    planMyId?: string;
    additionalInfo?: string;
    value?: number;
}

interface IEditContract {
    id: string;
    planMyId?: string;
    additionalInfo: string;
    value?: number;
}

export {
    ILogin,
    IGenerateRefreshToken,
    ICreateTokenUser,
    ICreateUser,
    IEditUser,
    IEditPasswordUser,
    ICreateClient,
    IEditClient,
    ICreateClientGalaxyPay,
    ITokenGalaxyPayResponse,
    ICreateVehicle,
    IEditVehicle,
    ICreateBusinessUnit,
    IEditBusinessUnit,
    ICreatePlan,
    IPlanPrice,
    IEditProfile,
    IEditPasswordProfile,
    ICreateEvent,
    IEditEvent,
    ICreateContractPay,
    ICreateContract,
    IEditContractPay,
    IEditContract
}
