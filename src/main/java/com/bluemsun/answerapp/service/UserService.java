package com.bluemsun.answerapp.service;

import com.bluemsun.answerapp.entity.UserBean;
import org.springframework.stereotype.Service;

/**
 * Created by mafx on 2018/10/25.
 * @author mafx.
 */
@Service
public interface UserService {
    UserBean getUserByPwdAndUsername(String username, String pwd);
}
