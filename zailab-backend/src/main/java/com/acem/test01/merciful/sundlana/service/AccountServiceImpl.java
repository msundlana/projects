package com.acem.test01.merciful.sundlana.service;

import com.acem.test01.merciful.sundlana.exception.AccountNotFoundException;
import com.acem.test01.merciful.sundlana.exception.WithdrawalAmountTooLargeException;
import com.acem.test01.merciful.sundlana.model.Account;
import com.acem.test01.merciful.sundlana.model.AccountType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */
@Service
public abstract class AccountServiceImpl implements AccountService {

    private Account account;
    private Map<Long, Account> accounts;

    public void openSavingsAccount(Long accountId, int amountToDeposite){
        account = new Account(accountId, AccountType.SAVINGSACCOUNT,amountToDeposite);
    }

    public void openCurrentAccount(Long accountId){
        account = new Account(accountId, AccountType.CURRENTACCOUNT);
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Map<Long, Account> getAccounts() {
        if (accounts == null) {
            accounts = new LinkedHashMap<Long, Account>();
        }
        return accounts;
    }

    public void setAccounts(Map<Long, Account> accounts) {
        this.accounts = accounts;
    }

}
