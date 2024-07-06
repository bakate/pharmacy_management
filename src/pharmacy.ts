type DrugUpdateStrategy = {
  update(drug: Drug): void;
};

export class Drug {
  constructor(
    public name: string,
    public expiresIn: number,
    public benefit: number,
  ) {}

  decrementExpiresIn(): void {
    this.expiresIn--;
  }

  increaseBenefit(amount: number): void {
    this.benefit = Math.min(50, this.benefit + amount);
  }

  decreaseBenefit(amount: number): void {
    this.benefit = Math.max(0, this.benefit - amount);
  }
}

// Regular Drug Strategy
class RegularDrugStrategy implements DrugUpdateStrategy {
  update(drug: Drug): void {
    drug.decrementExpiresIn();
    drug.decreaseBenefit(drug.expiresIn < 0 ? 2 : 1);
  }
}

// Herbal Tea Strategy
class HerbalTeaStrategy implements DrugUpdateStrategy {
  update(drug: Drug): void {
    drug.decrementExpiresIn();
    drug.increaseBenefit(drug.expiresIn < 0 ? 2 : 1);
  }
}

// Fervex Strategy
class FervexStrategy implements DrugUpdateStrategy {
  update(drug: Drug): void {
    drug.decrementExpiresIn();
    if (drug.expiresIn < 0) {
      drug.benefit = 0;
    } else if (drug.expiresIn <= 5) {
      drug.increaseBenefit(3);
    } else if (drug.expiresIn <= 10) {
      drug.increaseBenefit(2);
    } else {
      drug.increaseBenefit(1);
    }
  }
}

// Magic Pill Strategy
class MagicPillStrategy implements DrugUpdateStrategy {
  update(drug: Drug): void {}
}

// Dafalgan Strategy
class DafalganStrategy implements DrugUpdateStrategy {
  update(drug: Drug): void {
    drug.decrementExpiresIn();
    drug.decreaseBenefit(drug.expiresIn < 0 ? 4 : 2);
  }
}

export class Pharmacy {
  private strategies: Map<string, DrugUpdateStrategy>;
  constructor(public drugs: Drug[] = []) {
    this.strategies = new Map([
      ["Regular", new RegularDrugStrategy()],
      ["Herbal Tea", new HerbalTeaStrategy()],
      ["Fervex", new FervexStrategy()],
      ["Magic Pill", new MagicPillStrategy()],
      ["Dafalgan", new DafalganStrategy()],
    ]);
  }

  public updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const strategy =
        this.strategies.get(drug.name) ?? this.strategies.get("Regular");
      if (strategy) {
        strategy.update(drug);
      }
    });
    return this.drugs;
  }
}
