export class Drug {
  constructor(public name:string, public expiresIn: number, public benefit:number) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(public drugs:Drug[] = []) {
  }
  updateBenefitValue() {
    for (let i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];
      if(!drug){
        continue;
      }

      if (
        drug.name != "Herbal Tea" &&
        drug.name != "Fervex"
      ) {
        if (drug.benefit > 0) {
          if (drug.name != "Magic Pill") {
            drug.benefit = drug.benefit - 1;
          }
        }
      } else {
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;
          if (drug.name == "Fervex") {
            if (drug.expiresIn < 11) {
              if (drug.benefit < 50) {
                drug.benefit = drug.benefit + 1;
              }
            }
            if (drug.expiresIn < 6) {
              if (drug.benefit < 50) {
                drug.benefit = drug.benefit + 1;
              }
            }
          }
        }
      }
      if (drug.name != "Magic Pill") {
        drug.expiresIn = drug.expiresIn - 1;
      }
      if (drug.expiresIn < 0) {
        if (drug.name != "Herbal Tea") {
          if (drug.name != "Fervex") {
            if (drug.benefit > 0) {
              if (drug.name != "Magic Pill") {
                drug.benefit = drug.benefit - 1;
              }
            }
          } else {
            drug.benefit =
              drug.benefit - drug.benefit;
          }
        } else {
          if (drug.benefit < 50) {
            drug.benefit = drug.benefit + 1;
          }
        }
      }
    }

    return this.drugs;
  }
}