package my.innovation.new_projet2.entity;

public enum TypeConges {
    ANNUEL("Congé annuel"),
    MALADIE("Congé maladie"),
    SANS_PAIE("Congé sans paie"),
    MATERNITE("Congé de maternité"),
    PATERNITE("Congé de paternité"),
    TEMPORAIRE("Congé temporaire"),
    EXCEPTIONNEL("Congé exceptionnel"),
    AUTRE("Autre type de congé");

    private final String description;

    TypeConges(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
