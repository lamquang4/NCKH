package com.backend.cart_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class CartServiceApplicationTests {

    @MockBean
    RedisTemplate<String, Object> redisTemplate;

	@Test
	void contextLoads() {
	}

}
