package com.backend.order_service.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_orders_userId", columnList = "userId"),
    @Index(name = "idx_orders_orderCode", columnList = "orderCode")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false, unique = true, length = 15)
  private String orderCode;

  @Column(nullable = false, length = 50)
  private String fullname;

  @Column(nullable = false, length = 15)
  private String phone;

  @Column(nullable = false, length = 70)
  private String speaddress;

  @Column(nullable = false, length = 70)
  private String city;

  @Column(nullable = false, length = 70)
  private String ward;

  @Column(nullable = false)
  private String userId;

  @Column(nullable = false, length = 15)
  private String paymethod;

  @Column(nullable = false)
  private Integer status;

  @Column(nullable = false)
  private Double total;

  @Builder.Default
  private LocalDateTime createdAt = LocalDateTime.now();

  @Builder.Default
  private LocalDateTime updatedAt = LocalDateTime.now();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> items;
}