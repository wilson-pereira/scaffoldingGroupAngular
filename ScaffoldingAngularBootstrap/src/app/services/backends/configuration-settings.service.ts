import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ConfigurationSettingsService {

  constructor() { }

  private URL_BASE : string = 'http://localhost:8080/api/';

  public getApiUrlBase() : string { return this.URL_BASE; }


  /*******************************************
   * LOGIN
   * *************************************** */
  private URL_LOGIN : string = 'user/login';

  public getUrlLogin() : string { return this.URL_BASE + this.URL_LOGIN; }



  /**********************************************
   * MONTH AND YEARS
   * *******************************************/
  private URL_MONTH_YEARS_LIST = 'monthandyear/list';

  public getUrlMonthAndYearsList() : string { return this.URL_BASE + this.URL_MONTH_YEARS_LIST; }

  /**********************************************
    EXPENSES
  ********************************************** */
  private URL_EXPENSE_GET_LIST = 'expense/getList/';

  private URL_EXPENSE_GET_ITEM = 'expense';

  private URL_EXPENSE_GET_ITEM_PAY = 'expense/pay/';

  public getUrlExpenseGetList(monthAndYear: string) { return this.URL_BASE + this.URL_EXPENSE_GET_LIST + monthAndYear; }

  public getUrlExpenseGetItem(id: number) { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM + '/' + id; }

  public getUrlExpenseGetSave() { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM; }

  public getUrlExpenseGetPayItem(id: number) { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM_PAY + id; }

  public getUrlExpenseDelete(id: number) { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM + '/' + id; }

  public getUrlExpenseSubItemSave(expenseId: number) { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM + '/' + expenseId + '/SubItem'; }

  public getUrlExpenseSubItemDelete(subitemId: number, expenseId: number) { return this.URL_BASE + this.URL_EXPENSE_GET_ITEM + '/' + expenseId + '/SubItem/' + subitemId; }

  /* *******************************************************
    RECEIPTS
  ******************************************************** */
  private URL_RECEIPTS_GET_LIST = 'receipts/getReceipts/';

  private URL_RECEIPTS_BASE = 'receipts/item';

  public getUrlReceiptByMonth(monthAndYear: string) { return this.URL_BASE + this.URL_RECEIPTS_GET_LIST + monthAndYear ; }

  public getUrlReceiptGetItem(receiptItemId: number) { return this.URL_BASE + this.URL_RECEIPTS_BASE + '/' + receiptItemId ; }

  public getUrlReceiptSaveItem() { return this.URL_BASE + this.URL_RECEIPTS_BASE ; }

  public getUrlReceiptDeleteItem(receiptItemId: number) { return this.URL_BASE + this.URL_RECEIPTS_BASE + '/' + receiptItemId ; }

  public getUrlReceiptPayItem(receiptItemId: number) { return this.URL_BASE + this.URL_RECEIPTS_BASE + '/' + receiptItemId + '/pay'; }

  public getUrlReceiptSaveSubItem(receiptItemId: number) { return this.URL_BASE + this.URL_RECEIPTS_BASE + '/' + receiptItemId + '/subitem'; }

  public getUrlReceiptDeleteSubItem(subItemId: number, receiptItemId: number) { return this.URL_BASE + this.URL_RECEIPTS_BASE + '/' + receiptItemId + '/subitem/' + subItemId; }

  /* *******************************************************
    CATEGORY
  ******************************************************** */
  private URL_CATEGORY_BASE = 'category';

  public getUrlCategorySave() { return this.URL_BASE + this.URL_CATEGORY_BASE; }

  public getUrlCategoryGetItem(id: number) { return this.URL_BASE + this.URL_CATEGORY_BASE + '/' + id; }

  public getUrlCategoryDeleteItem(id: number) { return this.URL_BASE + this.URL_CATEGORY_BASE + '/' + id; }

  public getUrlCategoryList() { return this.URL_BASE + this.URL_CATEGORY_BASE + '/list'; }


  /* *******************************************************
    IMPORTS
  ******************************************************** */
    private URL_IMPORTS_BASE = 'imports/';

    public getUrlImportsReceipts() { return this.URL_BASE + this.URL_IMPORTS_BASE + 'receipts'; }
    public getUrlImportsExpenses() { return this.URL_BASE + this.URL_IMPORTS_BASE + 'expenses'; }


}
