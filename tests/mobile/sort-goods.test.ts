import { expect, productsScreen, MobileConstants } from '../../src/mobile/fixtures/baseTest.js';

describe('Goods cases functionality', () => {
  interface SortTestData {
    description: string;
    applySort: () => Promise<void>;
    expectedProductName: string;
  }

  const sortTestData: SortTestData[] = [
    {
      description: 'Verify that products are sorted by name ascending',
      applySort: () => productsScreen.selectNameAscending(),
      expectedProductName: MobileConstants.SORT_RESULTS.PRODUCT_NAME_ASCENDING,
    },
    {
      description: 'Verify that products are sorted by name descending',
      applySort: () => productsScreen.selectNameDescending(),
      expectedProductName: MobileConstants.SORT_RESULTS.PRODUCT_NAME_DESCENDING,
    },
    {
      description: 'Verify that products are sorted by price ascending',
      applySort: () => productsScreen.selectPriceAscending(),
      expectedProductName: MobileConstants.SORT_RESULTS.PRODUCT_PRICE_ASCENDING,
    },
    {
      description: 'Verify that products are sorted by price descending',
      applySort: () => productsScreen.selectPriceDescending(),
      expectedProductName: MobileConstants.SORT_RESULTS.PRODUCT_PRICE_DESCENDING,
    },
  ];

  sortTestData.forEach(({ description, applySort, expectedProductName }) => {
    it(description, async () => {
      await productsScreen.tapSortButton();
      await applySort();
      const actualProductName = await productsScreen.getFirstProductName();
      expect(actualProductName).toBe(expectedProductName);
    });
  });
});
