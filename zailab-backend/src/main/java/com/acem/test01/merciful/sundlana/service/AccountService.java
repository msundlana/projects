package com.acem.test01.merciful.sundlana.service;

import com.acem.test01.merciful.sundlana.exception.AccountNotFoundException;
import com.acem.test01.merciful.sundlana.exception.WithdrawalAmountTooLargeException;
import com.acem.test01.merciful.sundlana.model.Account;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */

@ComponentScan
public interface AccountService {

    public void openSavingsAccount(Long accountId, int amountToDeposite);

    public void openCurrentAccount(Long accountId);

    public void withdraw(Long accountId, int amountToWithdraw) throws AccountNotFoundException, WithdrawalAmountTooLargeException;

    public void deposit(Long accountId, int amountToDeposit)throws AccountNotFoundException;

    public Map<Long, Account> getAccounts();
}
