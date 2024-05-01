function periodicityTranslate(value) {
  switch (value) {
    case "WEEKLY":
      return "Semanal";
    case "BIWEEKLY":
      return "Bisemanal";
    case "MONTHLY":
      return "Mensal";
    case "BIMONTHLY":
      return "Bimestral";
    case "QUARTERLY":
      return "Trimestral";
    case "BIANNUAL":
      return "Semestral";
    case "YEARLY":
      return "Anual";
    default:
      return "Indefinido";
  }
}

export { periodicityTranslate };
