enum Role {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

enum LicenseCategory {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    AB = 'AB',
    AC = 'AC',
    AD = 'AD',
    AE = 'AE',
    ACC = 'ACC'
}

enum Fuel {
    ETANOL = 'ETANOL',
    GASOLINE = 'GASOLINE',
    DIESEL = 'DIESEL',
    FLEX = 'FLEX',
    ELECTRIC = 'ELECTRIC',
    HYBRID = 'HYBRID',
    GNV = 'GNV',
    HYBRID_GNV = 'HYBRID_GNV',
    OTHER = 'OTHER'
}

enum TypeVehicle {
    CAR = 'CAR',
    MOTORCYCLE = 'MOTORCYCLE',
    TRUCK = 'TRUCK',
    OTHER = 'OTHERS'
}

enum PlanPeriodicity {
    WEEKLY = 'WEEKLY',
    BIWEEKLY = 'BIWEEKLY',
    MONTHLY = 'MONTHLY',
    BIMONTHLY = 'BIMONTHLY',
    QUARTERLY = 'QUARTERLY',
    BIANNUAL = 'BIANNUAL',
    YEARLY = 'YEARLY'
}

enum PaymentMethod {
    creditcard = 'creditcard',
    boleto = 'boleto'
}

export { Role, LicenseCategory, Fuel, TypeVehicle, PlanPeriodicity, PaymentMethod }
