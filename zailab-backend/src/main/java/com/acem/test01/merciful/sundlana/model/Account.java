package com.acem.test01.merciful.sundlana.model;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Map;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */
public class Account {

    private Long id;

    private AccountType type;

    private int balance;

    private int overdraft;


    public Account(){

    }

    public Account(Long id, AccountType type, int balance) {
        super();
        this.id = id;
        this.type = type;
        this.balance = balance;
    }

    public Account(Long id, AccountType type) {
        super();
        this.id = id;
        this.type = type;
    }

    public Long getid() {
        return id;
    }

    public void setid(Long id) {
        this.id = id;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getOverdraft() {
        return overdraft;
    }

    public void setOverdraft(int overdraft) {
        this.overdraft = overdraft;
    }
}
