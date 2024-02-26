package com.wecp.logisticsmanagementandtrackingsystem.service;


import com.wecp.logisticsmanagementandtrackingsystem.dto.CargoStatusResponse;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Customer;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {


    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CargoRepository cargoRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
        // save the customer to the database
    }

    public CargoStatusResponse viewCargoStatus(Long cargoId) {

       

        Cargo cargo= ((Object) cargoRepository.findById(cargoId)).orElse(null);
        if(cargo!=null){
            return new CargoStatusResponse(cargo.getId(),cargo.getStatus());
        }
        else{
            return null;
        }
        
        // Find the cargo by its id
    }
}