package com.acem.test01.merciful.sundlana.controller;

import com.acem.test01.merciful.sundlana.exception.AccountNotFoundException;
import com.acem.test01.merciful.sundlana.exception.WithdrawalAmountTooLargeException;
import com.acem.test01.merciful.sundlana.model.Account;
import com.acem.test01.merciful.sundlana.model.AccountType;
import com.acem.test01.merciful.sundlana.service.AccountService;
import com.acem.test01.merciful.sundlana.service.AccountServiceImpl;
import com.acem.test01.merciful.sundlana.service.CurrentAccount;
import com.acem.test01.merciful.sundlana.service.SavingsAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */
@RestController
@RequestMapping("account")
public class AccountController {

    @Autowired
    @Qualifier("currentAccount")
    private AccountService accountCurrent;

    @Autowired
    @Qualifier("savingsAccount")
    private AccountService accountSavings;

    private Map<Long, Account> accounts = new LinkedHashMap<Long, Account>();

    public AccountService getAccountService(Account account) {
        if (account.getType().equals(AccountType.CURRENTACCOUNT)){
            return accountCurrent;
        }else {
            return accountSavings;
        }

    }


    @RequestMapping(value = "/open_account", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> openAccount(@RequestParam(defaultValue = "0") int accountType,@RequestBody Account acc){

        AccountServiceImpl accountService = null;

        if(accountType==0){
            accountCurrent.openCurrentAccount(acc.getid());
            accountService = (CurrentAccount)accountCurrent;
        }else{
            accountSavings.openSavingsAccount(acc.getid(),acc.getBalance());
            accountService = (SavingsAccount)accountSavings;
        }
        accounts.put(acc.getid(),accountService.getAccount());
        List<Account> list = new ArrayList<Account>(accounts.values());
        return new ResponseEntity<List>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/accounts", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<?> getAccounts(){
        List<Account> list = new ArrayList<Account>(accounts.values());
        return new ResponseEntity<List>(list, HttpStatus.OK);
    }


    @RequestMapping(value = "/account", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<?> getAccount(@RequestParam(defaultValue = "null") Long accountId) throws AccountNotFoundException{
        Account account = accounts.get(accountId);
        if(account==null){
            return new ResponseEntity<Exception>(new AccountNotFoundException("Invalid account id"),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<Account> list = new ArrayList<Account>();
        list.add(account);
        return new ResponseEntity<List>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/withdraw", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<?> withdraw(@RequestParam(defaultValue = "null") Long accountId, @RequestParam(defaultValue = "-1") int amountToWithdraw) throws AccountNotFoundException, WithdrawalAmountTooLargeException{
        try {
            Account account = accounts.get(accountId);
            if (account.getType().equals(AccountType.CURRENTACCOUNT)){
                CurrentAccount ca = new CurrentAccount();
                ca.setAccounts(accounts);
                ca.withdraw(accountId,amountToWithdraw);
                accounts.replace(accountId,ca.getAccount());
            }else{
                SavingsAccount sa = new SavingsAccount();
                sa.setAccounts(accounts);
                sa.withdraw(accountId,amountToWithdraw);
                accounts.replace(accountId,sa.getAccount());
            }
            List<Account> list = new ArrayList<Account>(accounts.values());
            return new ResponseEntity<List>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Exception>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deposit", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> deposit(@RequestBody Account acc) throws AccountNotFoundException {

        try {
            Account account = accounts.get(acc.getid());
            if (account.getType().equals(AccountType.CURRENTACCOUNT)){
                CurrentAccount ca = new CurrentAccount();
                ca.setAccounts(accounts);
                ca.deposit(acc.getid(),acc.getBalance());
                accounts.replace(acc.getid(),ca.getAccount());
            }else{
                SavingsAccount sa = new SavingsAccount();
                sa.setAccounts(accounts);
                sa.deposit(acc.getid(),acc.getBalance());
                accounts.replace(acc.getid(),sa.getAccount());
            }
            List<Account> list = new ArrayList<Account>(accounts.values());
            return new ResponseEntity<List>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Exception>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/overdraft_limit", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> setOverDraftLimt(@RequestBody Account acc) throws AccountNotFoundException{
        try {
            Account account = accounts.get(acc.getid());
            if(account==null){
                throw new AccountNotFoundException("Invalid account id");
            }
            if(account.getType().equals(AccountType.CURRENTACCOUNT)){
                account.setOverdraft(acc.getOverdraft());
                accounts.replace(acc.getid(),account);
            }
            List<Account> list = new ArrayList<Account>(accounts.values());
            return new ResponseEntity<List>(list, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<Exception>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
