export class Drug {
  constructor(
    public name: string,
    public expiresIn: number,
    public benefit: number,
  ) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(public drugs: Drug[] = []) {}

  private updateRegularDrug(drug: Drug) {
    drug.expiresIn -= 1;
    if (drug.benefit >= 0) {
      drug.benefit = Math.max(0, drug.benefit - 1);
    } else {
      drug.benefit = Math.min(0, drug.benefit - 2);
    }
    // Ensure benefit is never more than 50
    drug.benefit = Math.min(50, drug.benefit);
  }

  private updateHerbalTea(drug: Drug): void {
    drug.expiresIn -= 1;
    if (drug.expiresIn >= 0) {
      // Not expired: increase by 1
      drug.benefit = Math.min(50, drug.benefit + 1);
    } else {
      // Expired: increase by 2
      drug.benefit = Math.min(50, drug.benefit + 2);
    }
  }

  private updateFervex(drug: Drug): void {
    // Decrease expiresIn
    drug.expiresIn -= 1;

    // Update benefit based on expiresIn
    if (drug.expiresIn < 0) {
      // After the expiration date, Benefit drops to 0
      drug.benefit = 0;
    } else if (drug.expiresIn <= 5) {
      // 5 days or less, Benefit increases by 3
      drug.benefit = Math.min(50, drug.benefit + 3);
    } else if (drug.expiresIn <= 10) {
      // 10 days or less, Benefit increases by 2
      drug.benefit = Math.min(50, drug.benefit + 2);
    } else {
      // More than 10 days, Benefit increases by 1
      drug.benefit = Math.min(50, drug.benefit + 1);
    }
  }

  public updateBenefitValue() {
    this.drugs.forEach((drug) => {
      switch (drug.name) {
        case "Herbal Tea":
          this.updateHerbalTea(drug);
          break;
        case "Fervex":
          this.updateFervex(drug);
          break;
        case "Magic Pill":
          // Magic Pill never changes
          return drug;
        default:
          this.updateRegularDrug(drug);
      }
    });

    return this.drugs;
  }
}
