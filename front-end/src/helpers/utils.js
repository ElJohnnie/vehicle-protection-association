function formatDocumentNumber(documentNumber) {
  if (documentNumber.length === 11) {
    return documentNumber.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  }
  return documentNumber.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1 $2 $3/$4-$5"
  );
}

function formatPhone(phone) {
  phone = phone.replace(/[^\d]/g, "");

  if (phone.length == 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return null;
}

function returnRoleValue(value) {
  if (value === "HIGH") return "Administrador";
  else if (value === "MEDIUM") return "Gerente";
  return "Comum";
}

function sanitizeValues(value) {
  if (typeof value === "string") {
    let sanitizedValue = value;
    if (sanitizedValue.includes("R$")) {
      sanitizedValue = sanitizedValue.replace("R$", "").trim();
    }
    if (sanitizedValue.includes(".")) {
      sanitizedValue = sanitizedValue.replace(".", "").trim();
    }
    if (sanitizedValue.includes(",")) {
      sanitizedValue = sanitizedValue.replace(",", ".").trim();
    }
    return sanitizedValue;
  }
  return value;
}

function toFloat(value) {
  const valueString = value.toString();
  if (valueString.includes(".")) {
    const parts = valueString.split(".");
    const decimals = parts[1];

    if (decimals.length > 0) {
      return value;
    } else {
      return parseFloat(value).toFixed(2);
    }
  } else {
    return parseFloat(value).toFixed(2);
  }
}

function compareByPaymentMethod(a, b) {
  if (a.payment === "creditcard" && b.payment !== "creditcard") {
    return -1;
  } else if (a.payment !== "creditcard" && b.payment === "creditcard") {
    return 1;
  } else {
    return 0;
  }
}

export {
  formatDocumentNumber,
  formatPhone,
  returnRoleValue,
  sanitizeValues,
  toFloat,
  compareByPaymentMethod,
};
