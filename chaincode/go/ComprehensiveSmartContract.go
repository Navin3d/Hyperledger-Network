package main

import (
	"encoding/json"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type ComprehensiveSmartContract struct {
	contractapi.Contract
}

type Asset struct {
	UserId       string
	DocumentId   string
	DocumentData string
}

func main() {
	comprehensiveChaincode, err := contractapi.NewChaincode(&ComprehensiveSmartContract{})
	if err != nil {
		log.Panicf("Error creating comprehensiveChaincode chaincode: %v", err)
	}

	if err := comprehensiveChaincode.Start(); err != nil {
		log.Panicf("Error starting comprehensiveChaincode chaincode: %v", err)
	}
}

func (s *ComprehensiveSmartContract) CreateAssert(ctx contractapi.TransactionContextInterface, userId string, documentId string, documentData string) string {
	newAsset := Asset{
		UserId:       userId,
		DocumentId:   documentId,
		DocumentData: documentData,
	}

	assetJson, err := json.Marshal(newAsset)
	if err != nil {
		errorString := "Error Parsing asset..."
		log.Fatal(errorString)
		return errorString
	}

	err = ctx.GetStub().PutState(documentId, assetJson)
	if err != nil {
		errorString := "Error storing asset onto chain..."
		log.Fatal(errorString)
		return errorString
	}

	return "Successfully stored data onto chain..."
}

func (s *ComprehensiveSmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, documentId string) (*Asset, error) {
	assetJson, err := ctx.GetStub().GetState(documentId)
	if err != nil {
		errorString := "Error fetching asset from chain..."
		log.Fatal(errorString)
		return nil, err
	}
	if assetJson == nil {
		errorString := "Asset with Id: " + documentId + " not found..."
		log.Fatal(errorString)
		return nil, err
	}

	var asset Asset
	err = json.Unmarshal(assetJson, &asset)
	if err != nil {
		errorString := "Error Parsing asset..."
		log.Fatal(errorString)
		return nil, err
	}

	return &asset, err
}

func (s *ComprehensiveSmartContract) ReadAllAsset(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		errorString := "Error fetching asset from chain..."
		log.Fatal(errorString)
		return nil, err
	}

	var assets []*Asset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Asset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	resultsIterator.Close()

	return assets, err
}
