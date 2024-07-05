import { faker } from "@faker-js/faker";
import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Regular drugs", () => {
    [
      {
        name: faker.company.name(),
        expiresIn: faker.number.int({ min: 1, max: 30 }),
        benefit: faker.number.int({ min: 1, max: 50 }),
      },
      {
        name: faker.company.name(),
        expiresIn: faker.number.int({ min: 1, max: 30 }),
        benefit: faker.number.int({ min: 1, max: 50 }),
      },
    ].forEach((drug) => {
      it(`should decrease the benefit and expiresIn of ${drug.name}`, () => {
        const drugs = [new Drug(drug.name, drug.expiresIn, drug.benefit)];
        const pharmacy = new Pharmacy(drugs);
        pharmacy.updateBenefitValue();
        expect(drugs[0].expiresIn).toBe(drug.expiresIn - 1);
        expect(drugs[0].benefit).toBe(drug.benefit - 1);
      });
    });
  });

  describe("Herbal Tea", () => {
    const herbalTeaDrug = "Herbal Tea";
    [
      {
        name: herbalTeaDrug,
        expiresIn: 10,
        benefit: 10,
      },
      {
        name: herbalTeaDrug,
        expiresIn: 5,
        benefit: 10,
      },
    ].forEach((drug) => {
      it(`should increase the benefit of ${drug.name.toUpperCase()}`, () => {
        const drugs = [new Drug(drug.name, drug.expiresIn, drug.benefit)];
        const pharmacy = new Pharmacy(drugs);
        pharmacy.updateBenefitValue();
        expect(drugs[0].benefit).toBe(drug.benefit + 1);
      });
    });
    it(`should increase twice the benefit after expiration date ${herbalTeaDrug.toUpperCase()}`, () => {
      const drugs = [new Drug(herbalTeaDrug, 0, 10)];
      const pharmacy = new Pharmacy(drugs);
      pharmacy.updateBenefitValue();
      expect(drugs[0].benefit).toBe(12);
    });
  });

  describe("Magic Pill", () => {
    const magicPillDrug = "Magic Pill";
    [
      {
        name: magicPillDrug,
        expiresIn: 18,
        benefit: 10,
      },
      {
        name: magicPillDrug,
        expiresIn: 5,
        benefit: 20,
      },
    ].forEach((drug) => {
      it(`should not decrease the benefit nor expiresIn of ${drug.name.toUpperCase()}`, () => {
        const drugs = [new Drug(drug.name, drug.expiresIn, drug.benefit)];
        const pharmacy = new Pharmacy(drugs);
        pharmacy.updateBenefitValue();
        expect(drugs[0].expiresIn).toBe(drug.expiresIn);
        expect(drugs[0].benefit).toBe(drug.benefit);
      });
    });
  });

  describe("Fervex", () => {
    const fervexDrug = "Fervex";

    it(`should increase the benefit by 1 when expiration date is greater than 10 days [${fervexDrug.toUpperCase()}]`, () => {
      const drugs = [new Drug(fervexDrug, 15, 20)];
      const pharmacy = new Pharmacy(drugs);
      pharmacy.updateBenefitValue();
      expect(drugs[0].benefit).toBe(20 + 1);
    });

    it(`should increase the benefit by 2 when expiration date is 10 days or less [${fervexDrug.toUpperCase()}]`, () => {
      const drugs = [new Drug(fervexDrug, 10, 20)];
      const pharmacy = new Pharmacy(drugs);
      pharmacy.updateBenefitValue();
      expect(drugs[0].benefit).toBe(20 + 2);
    });

    it(`should increase the benefit by 3 when expiration date is 5 days or less [${fervexDrug.toUpperCase()}]`, () => {
      const drugs = [new Drug(fervexDrug, 5, 20)];
      const pharmacy = new Pharmacy(drugs);
      pharmacy.updateBenefitValue();
      expect(drugs[0].benefit).toBe(20 + 3);
    });
  });
});
