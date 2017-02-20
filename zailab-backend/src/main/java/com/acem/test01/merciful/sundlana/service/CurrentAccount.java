package com.acem.test01.merciful.sundlana.service;


import com.acem.test01.merciful.sundlana.exception.AccountNotFoundException;
import com.acem.test01.merciful.sundlana.exception.WithdrawalAmountTooLargeException;
import com.acem.test01.merciful.sundlana.model.Account;
import org.springframework.stereotype.Component;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */
@Component
public class CurrentAccount extends AccountServiceImpl {

    public void withdraw(Long accountId, int amountToWithdraw) throws AccountNotFoundException, WithdrawalAmountTooLargeException{
        Account acc = getAccounts().get(accountId);
        if(acc==null){
            throw new AccountNotFoundException("Invalid account id");
        }

        int balance = acc.getBalance() - amountToWithdraw;
        int overdraft  = acc.getOverdraft();
        if(balance < -overdraft){
            throw new WithdrawalAmountTooLargeException("Withdrawal amount too large");
        }

        acc.setBalance(balance);
        setAccount(acc);

    }

    public void deposit(Long accountId, int amountToDeposit)throws AccountNotFoundException{
        Account acc = getAccounts().get(accountId);
        if(acc==null){
            throw new AccountNotFoundException("Invalid account id");
        }
        int balance = acc.getBalance() + amountToDeposit;
        acc.setBalance(balance);
        setAccount(acc);
    }

}
