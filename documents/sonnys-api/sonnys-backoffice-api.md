openapi: 3.0.0
info:
  title: Data API
  description: >
    # Sonnys Carwash Controls Data API.

    This API was documented in **OpenAPI Format** and will provide the endpoints
    necessary to properly performing retrieving of data that is available for
    you with Sonnys Controls BackOffice.

    # Nomenclature

    Through the documentation a few words will have special meaning and should be understood as follows:

    - Client: The carwash location

    - API Key: A unique `secret/password` that is given to grant access to the API. This should always be treated as
      a `password`.

    - API ID: A unique identifier that is given to grant access to the API. Used in conjunction with the API Key.


    # Authentication


    Every endpoint available for this API requires:

      - A valid license: Licensing is required for the API to function.

      - The X-Sonnys-API-Key: A `secret\password` exclusively to access the API.

      - The X-Sonnys-API-Id: A unique identifier for your API access.

    This information should be passed in *Header* and not passing this information will automatically return a not
    authorized response.

    ```
      HTTP status code of *403*: Not Authorized.
    ```

    Optionally may be sent to every endpoint available for this API the following information: 
    
     - The X-Sonnys-Site-Code: An string acting as a code value used to identify a site location.  
    
    If the site code is not allowed to use the sent X-Sonnys-API-Key then it is not authorized for access and will
    automatically return a not authorized response.
        
    # SSL Only

    The API will only accept requests that are done under a SSL layer. Any
    request not done under this layer will be automatically refused.

    # Throttling

    The BackOffice Data API uses a throttling mechanism to ensure that each API consumer has the same amount of 
    requests in a given period. This mechanism allows an application consuming the API to perform 20 requests in 
    a block of 15 seconds.
    
    The throttling works as follows. When the first reply occurs, the API will start a counter, for the 
    X-Sonnys-API-Id, at 1 with an expiration of 15 seconds. Each subsequent request will increase that counter. 
    Serving more than 20 requests in this time frame, the BackOffice Data API will throw an exception resulting 
    in an HTTP 429 status.    
    
    ```
      HTTP status code of *429*: Too Many Requests.
    ```
    
    ## Example:
    
    A Request to the transaction/list endpoint at 2022-07-14 at 13:53:00 UTC. The counter will be increased to one 
    and have its expiration set for 2022-07-14 at 13:53:15 UTC. For each request to the API, it will increase 
    the counter by 1. If 21 requests are made before 2022-07-14 at 13:53:15 UTC, it will throw an exception; 
    otherwise, the API will reset the counter and time.

    # Validation

    Endpoints that information is posted will have the payload validated and
    only a valid payload will be processed.

    # Code Samples

    All code samples were made using Guzzle library as a reference. The choice of Guzzle was on `readability` and
    the way that it made the samples more readable. The library used to perform requests to the API is completely up
    to the development team working with it.

    For more information on Guzzle: http://docs.guzzlephp.org/en/stable/

    # API Responses

    The API will return a HTTP status code of `200` whenever the request was successful, otherwise either one of
    the `400` series, or 500 series codes will be returned. The HTTP status codes that we are using as a reference are
    listed on Wikipedia: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

    * `2xx (Successful)`: The request was successfully received, understood, and
    accepted

    * `4xx (Client Error)`: The request contains bad syntax or cannot be fulfilled

    * `5xx (Server Error)`: The server failed to fulfill an apparently valid
    request

    # Error Types

    The following error codes are returned among the error messages as part of
    the response payload.

    ## RequestRateExceededError: API request rate limit exceeded

    The API holds a counter for each request reply in a given endpoint. This
    error will be returned when the request count is higher than the amount allowed
    on the API throttle. For more information on how throttling refer to the **Throttling** section above.

    ## PayloadValidationError: Payload validation failure

    The request payload is well formed however the values passed does not
    match the parameter criteria. Each parameter is validated individually and
    will have at least one possible validation error message.

    ## InvalidPayloadRequestTimestampError: Invalid payload request timestamp

    Each API request is validated by a timestamp. The request timestamp sent
    from the requestor must not be more than 5 minutes from the it's acceptance on the API.

    ## MissingClientCredentialsError: Missing client information

    All API requests requires that a X-Sonnys-API-ID and X-Sonnys-API-Key are sent in the headers. Not sending this
    information will generate an authorization error and return this error code.

    ## BadClientCredentialsError: Invalid client information

    All API requests requires that a X-Sonnys-API-ID is sent in the headers along
    with the X-Sonnys-API-Key. Either an invalid X-Sonnys-API-ID or X-Sonnys-API-Key will generate this error.

    ## MismatchCredentialsError: Valid credentials in wrong environment

    This error covers the case when the user is using a valid X-Sonnys-API-Key but not the correct environment.
    Like sending a valid production key on X-Sonnys-API-Key for the sandboxapi url.

    ## NotAuthorizedError: Access not authorized

    This error is returned whenever the information required for authentication is not sent, is invalid
    or the requestor does not have proper licensing.
       
    ## BadSiteCredentialsError: Invalid site code
    
    This error is returned whenever the information required for a site authorization is sent but it is an invalid site
    code. 
    
    ## NotAuthorizedSiteCredentialsError: Access not authorized to the site data. 
    
    This error is returned whenever the information required for the authentication and site authorization is sent and 
    both of them are valid, but the site is not authorized for access.
    
    ## NotAuthorizedSiteArgsError: Mismatch between arguments and headers. 

    This error is returned whenever the information required for the authentication and site authorization is sent and 
    both of them are valid, the site is authorized for access, but also is sent as a query argument a different site 
    code.     
    
    ## EntityNotFoundError: The requested entity could not be found

    This error is returned whenever a given inquiry returns no results.

    ## UnexpectedFailure: Api unexpected failure

    This error covers any other type of failure regarding the internal API
    logic.

    ## ServerUnexpectedFailure: An unexpected server response

    This error will cover any error response that was not expected by the API. This error will try, whenever possible,
    to pass a reference code that can be used to communicate with helpdesk.

  version: 0.2.0
  contact:
    email: controlshelpdesk@sonnysdirect.com
    name: Helpdesk
  license:
    name: Sonnys Carwarsh Controls BackOffice API License

servers:
  - url: 'https://sandboxapi.sonnyscontrols.com/v1'
    description: >-
      Main sandbox server. This server should be used to test your api
      integration against possible responses from the endpoints. Live data is
      not available. Similar to the production server, all endpoints requires
      authentication information to be passed through the header.
  - url: 'https://trigonapi.sonnyscontrols.com/v1'
    description: >-
      Main production server. This server should be used to integrate your cart
      with production live data. All endpoints requires authentication
      information to be passed through the header. Authentication is provided by
      helpdesk.

tags:
  - name: Transaction
    description: >-
      All endpoints under this group are used to retrieve transactions data.

components:

  responses:

    EmptySuccessResponse:
      description: A successful response that does not contain a body.
      content:
        application/json:
          schema:
            type: object

    ServerErrorResponse:
      description: The server or the application returned an unexpected error.
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/ServerUnexpectedFailure'

    RateExceededResponse:
      description: The number of requests to the API has exceeded the limited amount.
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/RequestRateExceedError'

    NotAuthorizedResponse:
      description: >-
        Required authentication information has not been given and the request
        has been blocked.
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/NotAuthorizedError'
              - $ref: '#/components/schemas/MissingClientCredentialsError'
              - $ref: '#/components/schemas/BadClientCredentialsError'
              - $ref: '#/components/schemas/MismatchCredentialsError'
              - $ref: '#/components/schemas/BadSiteCredentialsError'
              - $ref: '#/components/schemas/NotAuthorizedSiteArgsError'
              - $ref: '#/components/schemas/NotAuthorizedSiteCredentialsError'

    EntityNotFoundResponse:
      description: >-
        The requested entity was not found.
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/EntityNotFoundError'

    BadRequestResponse:
      description: >-
        The server cannot or will not process the request due to an apparent client error
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/UnexpectedFailure'
              - $ref: '#/components/schemas/InvalidPayloadRequestTimestampError'

    PayloadValidationErrorResponse:
      description: >-
        Unprocessable Entity. The request has validation errors and could not be processed.
      content:
        application/json:
          schema:
            type: object
            oneOf:
              - $ref: '#/components/schemas/PayloadValidationError'

  parameters:

    ApiKeyHeaderParameter:
      name: X-Sonnys-API-Key
      in: header
      description: >-
        The unique API key given to access the API endpoints. Requires the `X-Sonnys-API-ID` is present in header.
        This key is a `secret` and should be treated as such. `Required` for every request.
      schema:
        type: string
      required: true
      example: "your-api-key-here"

    ApiIdHeaderParameter:
      name: X-Sonnys-API-ID
      in: header
      description: >-
        This is the unique client identifier to gain access ot the API. It requires the `X-Sonnys-API-Key` present on
        the header. `Required` for every request.
      schema:
        type: string
      required: true
      example: "your-api-id-here"

    SiteApiKeyHeaderParameter:
      name: X-Sonnys-Site-Code
      in: header
      description: >-
        Represents the code of the client site allowed to use the API Key. It requires `X-Sonnys-API-Key` and 
        `X-Sonnys-API-ID` to be present on the header. `Optional` for every request.
      schema:
        type: string
      required: false
      example: "your-site-code-id-here"

    TransactionStartDateParameter:
      name: startDate
      in: query
      description: >-
        A Unix timestamp representing the start period for requesting a list of objects.
        The start period must be no lower than 6 months past present day.
        If not sent, 'today' will be assumed.
      schema:
        type: number
        example: 1591040159

    TransactionHashParameter:
      name: hash
      in: query
      description: >-
        A unique identifier to get a list of transaction data.
      schema:
        type: string
        example: "1aabac6d068eef6a7bad3fdf50a05cc8"

    TransactionEndDateParameter:
      name: endDate
      in: query
      description: >-
        A Unix timestamp representing the end period for requesting a list of objects.
        The end period must be no lower than 6 months past present day.
        If not sent, 'today' will be assumed.
      schema:
        type: number
        example: 1595187359

    TransactionSiteParameter:
      name: site
      in: query
      description: >-
        The code of the site to retrieve all objects that belong to it.
      schema:
        type: string
        example: MAIN

    TransactionRegionParameter:
      name: region
      in: query
      description: >-
        The region code retrieve all transactions that belong to sites associated to it.
        If site param sent, this param will be ignored.
      schema:
        type: string
        example: NORTH

    CollectionLimitParameter:
      name: limit
      in: query
      description: The items returned limit for a given collection
      schema:
        type: integer
        minimum: 1
        maximum: 100
        example: 100
        
    CollectionSalesAdvisorLimitParameter:
      name: limit
      in: query
      description: The items returned limit for a given collection
      schema:
        type: integer
        minimum: 1
        maximum: 500
        example: 500        

    CollectionOffsetParameter:
      name: offset
      in: query
      description: The items returned offset for a given collection
      schema:
        type: integer
        minimum: 1
        example: 1
    
    CollectionDepartmentNameParameter:
      name: departmentName
      in: query
      description: The department of item.
      schema:
        type: string
        example: 'Wash'
        enum: [ Wash, Detail, Service, Merchandise, Discount, GiftCard, WashBook, Recurring_Plan, Add_On, Vacuum_sales, Prepaid_Wash, Prepaid_vacuum, food, beverage, recipe ]
    
    TransactionItemTypeParameter:
      name: item_type
      in: path
      description: An enum of item types to filter the transaction list
      required: true
      schema:
        type: string
        enum:
          - wash
          - prepaid-wash
          - recurring
          - washbook
          - giftcard
          - merchandise
          - house-account
        example: wash

    TransactionIdParameter:
      name: trans_id
      in: path
      description: The unique identifier associated with a transaction.
      required: true
      schema:
        $ref: '#/components/schemas/EntityIdentifier'

    PrepaidNumberParameter:
      name: prepaidNumber
      in: query
      description: >-
        Prepaid number identifier, can be alphanumeric
      schema:
        type: string
        minimum: 1

    ItemIdQueryParameter:
      name: itemId
      in: query
      description: The unique identifier associated with an sale item. This parameter is used to filter accounts that are tied to a specific prepaid account (washbook, washbook recurring, giftcard, etc).
      required: false
      schema:
        $ref: '#/components/schemas/EntityIdentifier'

    AccountStatusParameter:
      name: accountStatus
      in: query
      description: >-
        The status of the prepaid account (washbook, washbook recurring, giftcard, etc).
      schema:
        type: string
        enum:  ['active', 'inactive']

    RecurringAccountStatusParameter:
      name: recurringAccountStatus
      in: query
      description: >-
        This field is not mandatory. Recurring Account Status:
        [1 => "Active", 2 => "Payment Failed", 3 => "Payment CC Expired", 4 => "Payment Retries Exceeded", 5 => "Suspended", 6 => "Expired", 7 => "Cancelled",8 => "Declined", 9 => "Authorizer Error", 10 => "Cleared Tokens", 11 => "Changed Authorizer", 12 => "Payment CC Update Started", 13 => "Payment CC Update Declined", 14 => "Authorizer communication error", 15 => "Unknown error error"]
      schema:
        type: number
        enum:  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    RecurringAccountModificationParameter:
      name: modifications
      in: query
      description: >-
        This field is not mandatory. Recurring Account Modification types:
        [1 => "Tag Added", 2 => "Tags Removed", 3 => "Billing Amount Change, 4 => "Vehicle Plate Changed", 5 => "Tag Enabled", 6 => "Tag Disabled", 7 => "Account Status Changed"]
      schema:
        type: number
        enum: [1,2,3,4,5,6,7]

    RecurringAccountSiteParameter:
      name: sites
      in: query
      description:
        Represent the site codes separated by coma `,` used to filter the result. This field is not mandatory.
      schema:
        type: string
        example: MAIN,CDI001

    CustomerIdQueryParameter:
      name: customerId
      in: query
      description: The unique identifier associated with a customer. This parameter is used to retrieve all prepaid accounts (washbook, washbook recurring, giftcard, etc) tied to a customer.
      required: false
      schema:
        $ref: '#/components/schemas/EntityIdentifier'

    CustomerFirstNameParameter:
      name: firstName
      in: query
      description: >-
        A value to be used as last name filter for customer list.
      schema:
        type: string
        example: John

    CustomerLastNameParameter:
      name: lastName
      in: query
      description: >-
        A value to be used as first name filter for customer list.
      schema:
        type: string
        example: Doe

    CustomerStatusParameter:
      name: status
      in: query
      description: >-
        A value to be used as status filter for customer list.
      schema:
        type: string
        enum:
          - active
          - inactive
        example: active

    CustomerStartDateParameter:
      name: startDate
      in: query
      description: >-
        Allows filtering customers who are created on or after the specified date.
        The start date must not pass 'today'. This is optional.
      schema:
        type: string
        example: 2025-01-01

    CustomerEndDateParameter:
      name: endDate
      in: query
      description: >-
        Allows filtering customers who are modified on or before the specified date.
        Those who have not been modified are also included.
        This is optional.
      schema:
        type: string
        example: 2025-01-31

    CustomerPhoneNumberParameter:
      name: phoneNumber
      in: query
      description: >-
        The customer’s phone number used to filter search results.
        Customer phone numbers that include the prefix 1 will not be excluded if the search criteria ignore it, and vice versa.
        This is optional query argument.
      schema:
        type: string
        example: '2134567890'
        minLength: 10
        maxLength: 11

    EmployeeIdParameter:
      name: employee_id
      in: path
      description: The unique identifier associated with a employeeid.
      required: true
      schema:
        type: string

    AccountIdIdParameter:
      name: account_id
      in: path
      description: The unique identifier associated with a account.
      required: true
      schema:
        type: string

    CustomerIdParameter:
      name: customer_id
      in: path
      description: The unique identifier associated with a customer.
      required: true
      schema:
        $ref: '#/components/schemas/EntityIdentifier'

    StartDateYMDParameter:
      name: startDate
      in: query
      description: >-
        A string date in format of YYYY-MM-DD.
      schema:
        type: string
        example: "2020-01-01"

    EndDateYMDParameter:
      name: endDate
      in: query
      description: >-
        A string date in format of YYYY-MM-DD.
      schema:
        type: string
        example: "2020-01-14"

    CollectionLimitParameterV2:
      name: limit
      in: query
      description: The items returned limit for a given collection. Minimum value is 100 and Maximum value is 1000
      schema:
        type: integer
        minimum: 100
        maximum: 1000
        example: 100


    EndDateNoLimitParameter:
      name: endDate
      in: query
      description: >-
        A Unix timestamp representing the end period for requesting a list of objects.
        If not sent, 'today' will be assumed.
      schema:
        type: number
        example: 1595187359

    StartDateNoLimitParameter:
      name: startDate
      in: query
      description: >-
        A Unix timestamp representing the end period for requesting a list of objects.
        If not sent, 'today' will be assumed.
      schema:
        type: number
        example: 1595187359

  schemas:
    EntityIdentifier:
      description: The unique identifier for a specific entity.
      type: string
      pattern: ^\d+:\d+$
      example: 45678:1001

    BaseError:
      description: The base error object parent to all documented errors.
      type: object
      required:
        - type
      properties:
        type:
          description: >-
            The specific error type. The client *SHOULD* use this value to
            determine which type of error is provided.
          type: string
          example: NotAuthorizedError
          enum:
            - RequestRateExceedError
            - PayloadValidationError
            - InvalidPayloadRequestTimestampError
            - BadClientCredentialsError
            - MissingClientCredentialsError
            - MismatchCredentialsError
            - EntityNotFoundError
            - NotAuthorizedError
            - UnexpectedFailure
            - ServerUnexpectedFailure

    RequestRateExceedError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The API holds a counter for each request reply in a given endpoint.
            This error will be returned when the request count is higher than
            the amount allowed on the API throttle.
          example: RequestRateExceedError
          type: string
          enum:
            - RequestRateExceedError
        message:
          type: string
          example: >-
            The number of requests exceeded the allowed API rate. Request
            blocked.

    PayloadValidationError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The request payload is well formed however the values passed does not match the parameter criteria. Each
            parameter is validated individually and will have at least one possible validation error message.
          example: PayloadValidationError
          type: string
          enum:
            - PayloadValidationError
        messages:
          type: array
          items:
            type: string
            example: The request payload is well formed however the values passed does not match the parameter criteria.

    InvalidPayloadRequestTimestampError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            Each API request is validated by a timestamp. The request timestamp sent from the requester must not be
            more than 5 minutes from the it's acceptance on the API.
          example: InvalidPayloadRequestTimestampError
          type: string
          enum:
            - InvalidPayloadRequestTimestampError
        message:
          type: string
          example: The time difference from the request and API is over 5 minutes.

    MissingClientCredentialsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            One or more of the required header authentication information was not sent on the request. Please verify
            the required information from the endpoint and attempt again. Error persisting, please contact helpdesk.
          example: MissingClientCredentialsError
          type: string
          enum:
            - MissingClientCredentialsError
        message:
          type: string
          example: One or more of the required header authentication information was not sent on the request.

    MismatchCredentialsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            Using production credentials on sandbox environment or vise versa.
          example: MismatchCredentialsError
          type: string
          enum:
            - MismatchCredentialsError
        message:
          type: string
          example: Using valid credentials in wrong environment.

    BadClientCredentialsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The information required for authentication has been sent but the credentials are not valid. Please verify
            and attempt again. If the error persists, please contact Helpdesk.
          example: BadClientCredentialsError
          type: string
          enum:
            - BadClientCredentialsError
        message:
          type: string
          example: The information required for authentication has been sent but the credentials are not valid.

    BadSiteCredentialsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The information required for authorization has been sent but the site code is not valid. Please verify
            and attempt again.
          example: BadSiteCredentialsError
          type: string
          enum:
            -  BadSiteCredentialsError
        message:
          type: string
          example: There is not site identified by the site code in the client.

    NotAuthorizedError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The authorization request is well formed and information has been properly sent but this set of api key
            and id is not authorized for access.
          example: BadClientCredentialsError
          type: string
          enum:
            - BadClientCredentialsError
        message:
          type: string
          example: Unauthorized access. Please verify information sent or contact helpdesk.

    NotAuthorizedSiteArgsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The authorization request is well formed and information has been properly sent. The set of API key, Id
            and site code is authorized for access, but the site code sent as argument on the query is not authorized
            for access.
          example: NotAuthorizedSiteArgsError
          type: string
          enum:
            - NotAuthorizedSiteArgsError
        message:
          type: string
          example: >-
            The site code has been sent as a header and it is allowed to use the credentials, however the query
            argument `site=` is sent and does not contain the site id represented by site code sent.

    NotAuthorizedSiteCredentialsError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The authorization request is well formed and information has been properly sent but this set of Api key, id
            and site code is not authorized for access.
          example: NotAuthorizedSiteCredentialsError
          type: string
          enum:
            - NotAuthorizedSiteCredentialsError
        message:
          type: string
          example: >-
            The site code has been sent as a header but it is not allowed to use the credentials.

    EntityNotFoundError:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            The resource searched for was not found.
          example: EntityNotFoundError
          type: string
          enum:
            - EntityNotFoundError
        message:
          type: string
          example: The Recurring Plan searched for was not found.

    UnexpectedFailure:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            This error covers any other type of failure regarding the internal logic.
          example: UnexpectedFailure
          type: string
          enum:
            - UnexpectedFailure
        message:
          type: string
          example: An unexpected error has occurred.

    ServerUnexpectedFailure:
      allOf:
        - $ref: '#/components/schemas/BaseError'
      type: object
      properties:
        type:
          description: >-
            This error covers any other type of failure regarding the internal logic.
          example: ServerUnexpectedFailure
          type: string
          enum:
            - ServerUnexpectedFailure
        message:
          type: string
          example: An unexpected error has occurred.
        code:
          type: string
          example: SCEC0001
          description: >-
            A string that will uniquely identify that specific error that has occurred. This can be used as a reference
            for communication and troubleshooting the issue.

    ItemObject:
      type: object
      description: Represents an item.
      properties:
        sku:
          type: string
          example: "253425"
        name:
          type: string
          example: 'bronze wash'
          description: The name of the item for sale.
        departmentName:
          type: string
          example: 'Wash'
          enum: [Wash, Detail, Service, Merchandise, Promotion/Coupon, GiftCard, WashBook, Recurring Plan, Add On, Vacuum Sales, Prepaid Wash]
          description: The department of item.
        priceAtSite:
          type: string
          example: "5.00"
          description: The price of item for a given site.
        isPromptForPrice:
          type: boolean
          example: false
          description: Indicates if the item will be priced at the time of sale. For example, when item is prompt for price and is sold at POS. The POS will prompt user for a price to be sold at. This is variable price that can be set
            at any value at the time of sale.
        siteLocation:
          type: string
          example: "MAIN"
          description: The site that item is sold at.

    TransactionListItemObject:
      type: object
      description: Represents a transaction summary.
      properties:
        transNumber:
          type: integer
          example: 253425
        transId:
          type: string
          example: '876:1001'
          description: A unique identifier required to retrieve the transactions details.
        total:
          type: number
          format: float
          example: 7.99
          description: The total charged for the transaction including discounts and taxes.
        date:
          type: string
          example: '2018-05-19T05:32:32.000Z'
          description: A UTC datetime of when this transaction was performed.

    TransactionListItemVersion2Object:
      type: object
      description: Represents a transaction summary (VERSION 2).
      allOf:
        - $ref: '#/components/schemas/TransactionListItemObject'
        - type: object
          properties:
            customerId:
              type: string
              example: '1:234'
              description: A unique identifier for the customer.
              nullable: true
            isRecurringPlanSale:
              type: boolean
              example: true
            isRecurringPlanRedemption:
              type: boolean
              example: true
            transactionStatus:
              type: string
              enum: [Incomplete, In-Progress, Completed, Suspended, Voided, Recalled, Pre-Sell, N/A]
              example: Incomplete

    TransactionListJobObject:
      type: object
      description: Represents a payload from /transaction/get-job-data.
      allOf:
        - $ref: '#/components/schemas/TransactionObject'
        - type: object
          properties:
            customerId:
              type: string
              example: '1:234'
              description: A unique identifier for the customer.
              nullable: true
            isRecurringPlanSale:
              type: boolean
              example: true
            isRecurringPlanRedemption:
              type: boolean
              example: true
            transactionStatus:
              type: string
              enum: [Incomplete, In-Progress, Completed, Suspended, Voided, Recalled, Pre-Sell, N/A]
              example: Incomplete

    TransTypeObject:
      type: string
      enum:
        - Sale
        - Return
        - Rewash
      example: Sale
      description: The type of the transaction that was made.

    TransactionTenderObject:
      type: object
      properties:
        tender:
          type: string
          enum:
            - Cash
            - Credit
            - Debit
            - Void
            - Alt-Currency
            - Check
            - Prepaid
            - Coupon
            - Paid On Account
            - Prepaid 3rd Party
            - Fleet
            - Prepaid Wash
          example: Credit
          description: The tender type used for this transaction.
        tenderSubType:
          type: string
          nullable: true
          enum:
            - Visa
            - MasterCard
            - Discover
            - Amex
            - Giftcard
            - Washbook
            - Washbook Recurring
            - RFID
            - RFID Recurring
            - XpressWash
            - Code
            - Hamilton Fleet
            - Hamilton Value
            - 3rd Party Interface
            - House Account Card
            - Voyager
            - Other
            - P-Card
            - House Account RFID
            - LPR
            - Debit
          example: Visa
          description: The sub tender type used for this transaction.
        amount:
          type: number
          format: float
          example: 20.00
          description: The amount charged on this tender.
        change:
          type: number
          format: float
          example: -1.00
          description: The amount changed.
        total:
          type: number
          format: float
          example: 19.00
          description: The total amount.
        referenceNumber:
          type: string
          example: "62375401832"
          nullable: true
          description: A reference number for the transaction, if applicable.
        creditCardLastFour:
          type: string
          example: "1111"
          nullable: true
        creditCardExpirationDate:
          type: string
          format: date
          example: 2025-01
          nullable: true

    TransactionItemObject:
      type: object
      description: >-
        Will represent an order item. This can be merchandise, washes,
        discounts, etc.
      properties:
        name:
          type: string
          example: Basic Wash
        sku:
          type: string
          example: '1281127182'
          nullable: true
          description: A unique identification used to track this item.
        department:
          type: string
          example: Wash
        quantity:
          type: integer
          example: 1
          description: The count of items purchased for this order groupped by item.
        gross:
          type: number
          format: float
          example: 8.55
        net:
          type: number
          format: float
          example: 7.99
        discount:
          type: number
          format: float
          example: 0.00
        tax:
          type: number
          format: float
          example: 0.56
        additionalFee:
          type: number
          format: float
          example: 2.9
        isVoided:
          type: boolean
          example: false

    TransactionDiscountObject:
      type: object
      description: >-
        Represent discount data from transaction
      properties:
        discountName:
          type: string
          example: Basic Wash Discount
        discountSku:
          type: string
          example: '1281127182'
          nullable: true
          description: A unique identification used to track this discount item.
        appliedToItemName:
          type: string
          example: Basic Wash
          description: The sale item that the discount was applied to.
        discount:
          type: number
          format: float
          example: 2.00
        discountCode:
          type: string
          example: '91415818'
          description: The code used to apply the discount.

    TransactionObject:
      type: object
      description: Will represent a transaction.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier required to retrieve the transactions details.
        number:
          type: integer
          example: 253425
          description: The transaction number.
        type:
          $ref: '#/components/schemas/TransTypeObject'
        completeDate:
          type: string
          example: '2020-05-19T05:32:32.000Z'
          description: A UTC datetime of when this transaction was performed.
        locationCode:
          type: string
          example: 'SITE1'
          description: >-
            The code identifing the site where the transaction was made.
        salesDeviceName:
          type: string
          example: 'POS1'
          description: The name of the device executing the transaction.
        total:
          type: number
          format: float
          example: 7.99
          description: >-
            The total charged for the transaction including discounts and taxes.
        tenders:
          type: array
          items:
            $ref: '#/components/schemas/TransactionTenderObject'
        items:
          type: array
          items:
            $ref: '#/components/schemas/TransactionItemObject'
          description: >-
            A list of order items and discounts that belongs to this
            order/transaction.
        customerName:
          type: string
          example: 'John Doe'
          description: The name of the customer, if applicable.
          nullable: true
        customerId:
          type: string
          example: '1:234'
          description: A unique identifer for the customer.
          nullable: true
        vehicleLicensePlate:
          type: string
          example: 'ABC123'
          description: The license plate associated to the transaction, if applicable.
          nullable: true
        employeeCashier:
          type: string
          example: 'Mary Jones'
          description: The name of the cachier, if applicable.
          nullable: true
        employeeGreeter:
          type: string
          example: 'Rick Johnson'
          description: The name of the greeter, if applicable.
          nullable: true
        discount:
          type: array
          items:
            $ref: '#/components/schemas/TransactionDiscountObject'
        isRecurringPayment:
          type: boolean
          example: false
          description: A flag to determine if this transaction is a recurring payment made by Sonny's billing software. This is the membership plan that is billed to active recurring plan customers to upkeep their car washing privileges. A recurring payment can be made on a monthly or yearly basis. If this value is true then the other fields isRecurringRedemption, isRecurringSale, isPrepaidRedemption, isPrepaidSale is false.
        isRecurringRedemption:
          type: boolean
          example: false
          description: A flag to determine if this transaction is a recurring redemption made by customer. A recurring redemption is when a customer is utilizing their recurring plan (aka car wash privileges) to get a car wash. If this value is true then the other fields isRecurringPayment, isRecurringSale, isPrepaidRedemption, isPrepaidSale is false.
        isRecurringSale:
          type: boolean
          example: false
          description: A flag to determine if this transaction is a recurring sale made by customer. A recurring sale is where a customer purchased a recurring wash plan. In other words, the customer is opting into a membership plan with a business for car washing privileges. If this value is true then the other fields isRecurringPayment, isRecurringRedemption, isPrepaidRedemption, isPrepaidSale is false.
        isPrepaidRedemption:
          type: boolean
          example: false
          description: A flag to determine if this transaction is a non-recurring redemption made by customer. A non-recurring redemption can be a customer redeeming prepaid wash, washbook, vacuum, giftcard. A prepaid wash is where a customer will purchase a item, typically a wash in prepaid form, to be used at a car wash business in the future. A washbook is the same idea as prepaid wash but it is a book or package of washes to be used at a future time. A vacuum is a prepaid item that allows a customer to clean their car. Typically the vacuum time is has a code and the code is entered on the vacuum system giving the customer an alotted amount of time in minutes on how long to use the vacuum. A giftcard is a card that allows you to typically buy any item at a car wash. Gift cards are usually used to buy a wash but can be used other items as well such as merchandise or a service (special car wash packages that go with a purchase of a car wash). If this value is true then the other fields isRecurringPayment, isRecurringRedemption,isRecurringSale, isPrepaidSale is false.
        isPrepaidSale:
          type: boolean
          example: false
          description: A flag to determine if this transaction is a non-recurring sale made by customer. A non-recurring sale can be a customer buying, but not redeeming, a prepaid wash, washbook, vacuum, giftcard. A prepaid wash is where a customer will purchase a item, typically a wash in prepaid form, to be used at a car wash business in the future. A washbook is the same idea as prepaid wash but it is a book or package of washes to be used at a future time. A vacuum is a prepaid item that allows a customer to clean their car. Typically the vacuum time is has a code and the code is entered on the vacuum system giving the customer an alotted amount of time in minutes on how long to use the vacuum. A giftcard is a card that allows you to typically buy any item at a car wash. Gift cards are usually used to buy a wash but can be used other items as well such as merchandise or a service (special car wash packages that go with a purchase of a car wash). If this value is true then the other fields isRecurringSale, isRecurringPayment, isRecurringRedemption, isPrepaidRedemption, isPrepaidRedemption is false.

    CustomerListItemObject:
      type: object
      description: Represents a customer summary.
      properties:
        customerId:
          type: string
          example: "876:999"
        firstName:
          type: string
          example: John
          minLength: 2
          maxLength: 50
        lastName:
          type: string
          example: Doe
          minLength: 2
          maxLength: 100
        phoneNumber:
          type: string
          example: '2134567890'
          nullable: true
          maxLength: 20
        customerNumber:
          type: string
          maxLength: 20
          example: "053088815"
          nullable: true
        isActive:
          type: boolean
          example: true
        createdDate:
          type: string
          example: "2025-01-15 22:03:29"
        modifiedDate:
          type: string
          example: "2025-01-15 21:34:49"

    GiftcardListItemObject:
      type: object
      description: Represents a giftcard list item.
      properties:
        siteCode:
          type: string
          example: 'SITE1'
          description: >-
            The code identifing the site where the transaction was made.
        completeDate:
          type: string
          example: '2020-05-19 08:45:00'
          description: A UTC datetime of when card was created or recharged.
        number:
          type: string
          example: "253425"
          description: The prepaid card number, can be alphanumeric.
        value:
          type: number
          format: float
          example: 7.99
          description: >-
            The initial amount sold for.
        amountUsed:
          type: number
          format: float
          example: 7.99
          description: >-
            The amount used on giftcard.
        giftcardId:
          type: string
          example: "876:999"

    AddressObject:
      type: object
      description: >-
        A simple object representing a location address.
      properties:
        address1:
          type: string
          example: '5605 Hiatus Rd.'
          minLength: 1
          maxLength: 50
          nullable: true
        address2:
          type: string
          example: ''
          minLength: 0
          maxLength: 50
          nullable: true
        city:
          type: string
          example: Tamarac
          minLength: 1
          maxLength: 50
          nullable: true
        state:
          type: string
          example: FL
          description: A state code formed by 2 letters. Min and Max of 2.
          pattern: ^[A-Z]{2}$
          nullable: true
        country:
          type: string
          example: US
          description: A country code formed by 2 letters. Min and Max of 2.
          pattern: ^[A-Z]{2}$
          nullable: true
        postalCode:
          type: string
          example: "33321"
          description: A valid postal code. Numbers only. Min of 5 and max of 8.
          pattern: ^[0-9]{5}(?:-[0-9]{4})?$
          nullable: true

    CustomerObject:
      type: object
      description: Will represent a transaction.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier required to retrieve the customer details.
        number:
          type: string
          example: '00012345'
        firstName:
          type: string
          example: 'John'
        lastName:
          type: string
          example: 'Doe'
        companyName:
          type: string
          example: 'Enterprise'
        loyaltyNumber:
          type: string
          example: '00098765'
        address:
          $ref: '#/components/schemas/AddressObject'
        phone:
          type: string
          example: "9547204100"
          description: A valid US telephone number.
        email:
          type: string
          example: jdoe@example.com
          nullable: true
        birthDate:
          type: string
          format: date
          example: '1999-12-31'
          nullable: true
        isActive:
          type: boolean
          example: true
        allowSms:
          type: boolean
          example: true
          description: Whether the customer is opt-in for SMS marketing.
        recurringSmsSignupDate:
          type: string
          format: date-time
          example: '2019-04-01T18:05:04.000Z'
          description: >-
            The date and the customer was opted-in for Recurring SMS marketing.
          nullable: true
        loyaltySmsSignupDate:
          type: string
          format: date-time
          example: '2020-05-02T06:05:04.000Z'
          description: >-
            The date and the customer was opted-in for Loyalty SMS marketing.
          nullable: true
        modifyDate:
          type: string
          format: date-time
          example: '1999-12-31T00:01:02.000Z'

    WashbookAccountTagNumberObject:
      type: object
      description: >-
        Represents an WashBookObject, RFID or Card number associated with a recurring
        or washbook plan.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for a tag. Agent of the account.
        number:
          type: string
          example: "9870654032190"
          nullable: false
          description: A unique identifier for a tag. This is typically the RFID number that is tied to the tag.
        enabled:
          type: boolean
          description: >-
            Will return true if this tag can be used for redeeming an wash;
            otherwise false.
          example: true
          nullable: false

    WashbookAccountVehicleObject:
      type: object
      description: >-
        Represents an vehicle that is tied to a washbook account
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for a tag. Agent of the account.
        plate:
          type: string
          example: ABC123
          nullable: true

    WashbookAccountCustomerObject:
      type: object
      description: >-
        Represents an customer that is tied to a washbook account
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for a customer
          nullable: true
        number:
          type: string
          example: '123124324'
          description: A customer number identifier
          nullable: true
        firstName:
          type: string
          example: 'John'
          description: Customer first name
          nullable: true
        lastName:
          type: string
          example: 'Doe'
          description: Customer last name
          nullable: true

    WashbookAccountRecurringObject:
      type: object
      description: >-
        Represents an recurring info if that account is a "recurring account"
      properties:
        currentBillableAmount:
          type: number
          format: float
          example: 5.00
          nullable: false
        nextBillDate:
          type: string
          format: date
          example: '2020-01-01'
          nullable: true
          description: The date when the account will get charged again.
        lastBillDate:
          type: string
          format: date
          example: '2020-01-01'
          nullable: true
          description: The most recent successful bill date.
        isOnTrial:
          type: boolean
          description: When `true` the account is on a trial price.
            When `false` the account is not on a trial price. Trial price is a discounted memebership price for X
            amount of months. This only applies to monthly recurring plans.
          example: false
        remainingTrialPeriods:
          type: number
          example: 0
          description: Determines how many months the recurring account has left on the trial.
          nullable: false

    WashbookAccountDetailObject:
      type: object
      description: Will represent an washbook account.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier required to retrieve the account details.
        name:
          type: string
          example: 'Wash Plan'
          description: The name of the washbook or washbook recurring that is tied to account.
        balance:
          type: number
          format: string
          example: '5.00'
          nullable: true
          description: The number of redemptions left on this account. Note that if it is 999 then that most likely means the account has unlimited redemptions.
        customer:
          $ref: '#/components/schemas/WashbookAccountCustomerObject'
        status:
          format: string
          example: 'Active'
          description: Displays the status of the prepaid washbook account. The return values will typically be "Active" or "Inactive".
        recurringInfo:
          $ref: '#/components/schemas/WashbookAccountRecurringObject'
        tags:
          type: array
          nullable: false
          description: Holds a list with all available tags for this account. If no tags exist then empty array will be default value.
          items:
            $ref: '#/components/schemas/WashbookAccountTagNumberObject'
        vehicles:
          type: array
          nullable: false
          description: Holds a list with all available vehicles for this account. If no vehicles exist then empty array will be default value.
          items:
            $ref: '#/components/schemas/WashbookAccountVehicleObject'

    RecurringStatus:
      type: object
      description: >-
        Represents an recurring status and when that recurring status change was performed. Recurring status are not confined to these three statuses ('Active', 'Canceled', 'Suspended') but for now this endpoint will focus on these three statuses only.
      properties:
        status:
          type: string
          example: 'Active'
          enum: ['Active', 'Canceled', 'Suspended']
          nullable: false
          description: The status of the account.
        date:
          type: string
          format: datetime
          example: '2020-05-19T05:32:32.000Z'
          nullable: false
          description: The datetime (UTC) when then status of the account changed.

    RecurringBilling:
      type: object
      description: >-
        Represents a successful recurring billing. By successful we mean where the credit card was successful charged for PAYMENT only. For example, this data represents when an account needs to charged on a monthly or annual basis so that the customer can continue to use the recurring account at the car wash site. This data does not include activity billing such as a customer adding a new tag to the account or reactivating a old tag - also known as proration. Another example of activity billing is recurring upgrades or downgrades - these are not included in this dataset as well.
      properties:
        amountCharged:
          type: number
          format: string
          example: '5.00'
          nullable: false
          description: The amount charged on recurring account for this date.
        date:
          type: string
          format: datetime
          example: '2020-05-19T05:32:32.000Z'
          nullable: false
          description: The datetime (UTC) of the charge.
        lastFourCC:
          type: string
          example: 'XXXXXXXXXXXX0572'
          nullable: false
          description: The last of credit card that was used to charge account.
        creditCardExpirationDate:
          type: string
          format: datetime
          example: '2020-05'
          nullable: true
          description: The expiration date for the credit card that was used to charge account.

    RecurringAccountDetailObject:
      type: object
      description: Will represent an recurring account.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for the washbook recurring account.
          nullable: false
        isOnTrial:
          type: boolean
          example: false
          description: A flag to indicate if the recurring account is on trial. A trial is a special promotion where the customer purchases the plan at a lower price
            and has that lower price for N months. When N months has expired the recurring account will go back to the non-trial price.
          nullable: false
        trialAmount:
          type: number
          format: string
          example: '5.00'
          nullable: false
          description: The trial price the customer will be paying for N months. If isOnTrial is `false` then ignore this number. It most likely means the account was on a trial price but no longer is. So if that is the case then refer to `billingAmount` field
        billingSiteCode:
          type: string
          example: 'MAIN'
          nullable: false
          description: The site code that is tied to recurring account for billing purposes.
        creationSiteCode:
          type: string
          example: 'MAIN'
          nullable: false
          description: The site code that the recurring account was created.
        nextBillDate:
          type: string
          format: date
          example: '1999-12-31'
          nullable: false
          description: The next date this account will be billed.
        tags:
          type: array
          nullable: false
          description: Holds a list with all available tags for this account. If no tags exist then empty array will be default value.
          items:
            $ref: '#/components/schemas/WashbookAccountTagNumberObject'
        vehicles:
          type: array
          nullable: false
          description: Holds a list with all available vehicles for this account. If no vehicles exist then empty array will be default value.
          items:
            $ref: '#/components/schemas/WashbookAccountVehicleObject'
        lastBillDate:
          type: string
          format: date
          example: '2000-12-31'
          nullable: true
          description: The most recent successful billing date.
        billingAmount:
          type: number
          format: string
          example: '5.00'
          nullable: true
          description: The most recent successful billing amount that was made against the account.
        isSuspended:
          type: boolean
          example: false
          description: A flag to indicate if the recurring account is suspended. When this is `true` this can be thought as a pause on the recurring plan subscription.
          nullable: false
        suspendedUntil:
          type: string
          format: date
          example: '2000-12-31'
          description: A date that indicates the last day the account is suspended. This field goes hand in hand with isSuspended. So if `isSuspended` field is `true` then `suspendedUntil` field should be respected.
          nullable: true
        currentRecurringStatusName:
          type: string
          example: 'Active'
          enum: ["Active", "Payment Failed", "Payment CC Expired","Payment Retries Exceeded","Suspended","Expired","Cancelled","Declined","Authorizer Error","Cleared Tokens","Changed Authorizer","Payment CC Update Started","Payment CC Update Declined","Authorizer communication error","Unknown error error"]
          description: The status of the account.
          nullable: false
        planName:
          type: string
          example: 'Gold Plan'
          description: The name of the recurring plan that the recurring account is tied to
          nullable: false
        customer:
          $ref: '#/components/schemas/WashbookAccountCustomerObject'
        recurringStatuses:
          type: array
          nullable: false
          description:  Represents an recurring status and when that recurring status change was performed. In general, a recurring status are not confined to these three statuses ('Active', 'Canceled', 'Suspended') but for now this data field, `recurringStatuses`, will focus on these three statuses only.
          items:
            $ref: '#/components/schemas/RecurringStatus'
        recurringBillings:
          type: array
          nullable: false
          description: Represents a recurring billing. Where the credit card had a charge attempt for PAYMENT only - this does not include refunds. For example, this data represents when an account needs to charge on a monthly or annual basis so that the customer can continue to use the recurring account at the car wash site. This data does not include activity billing such as a customer adding a new tag to the account or reactivating a old tag - also known as proration. Another example of activity billing is recurring upgrades or downgrades - these are not included in this field dataset as well.
          items:
            $ref: '#/components/schemas/RecurringBilling'
        additionalTagPrice:
          type: number
          format: float
          nullable: true
          minimum: 0.00
          description: >-
            The Additional Tag Price used to increase the price at the next scheduled bill date.
          example: 10.50

    EmployeeClockEntryObject:
      type: object
      description: Represents a clock-in/clock-out entry.
      properties:
        clockIn:
          type: string
          format: date-time
          example: "2020-05-19T00:01:02.000Z"
          nullable: true
        clockOut:
          type: string
          format: date-time
          example: "2020-05-19T00:01:02.000Z"
          nullable: true
        regularRate:
          type: number
          format: double
          minimum: 0.0
          example: 5.4
        regularHours:
          type: number
          format: double
          minimum: 0.0
          example: 5.4
        overtimeEligible:
          type: boolean
          example: false
        overtimeRate:
          type: number
          format: double
          minimum: 0.0
          example: 5.4
        overtimeHours:
          type: number
          format: double
          minimum: 0.0
          example: 2.0
        wasModified:
          type: boolean
          example: false
        modificationTimestamp:
          type: string
          nullable: true
          format: date-time
          example: "2020-05-19T00:01:02.000Z"
        wasCreatedInBackOffice:
          type: boolean
          example: false
        siteCode:
          type: string
          example: "MAIN"
          description: >-
            The code identifying the site where the employee clock entry was made.

    EmployeeListItemObject:
      type: object
      description: Represents a employee list item.
      properties:
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        employeeId:
          type: number
          format: integer
          minimum: 0
          example: 1

    EmployeeDetailsObject:
      type: object
      description: Represents details of employee.
      properties:
        employeeId:
          type: number
          example: "1"
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        active:
          type: boolean
          example: false
        startDate:
          format: date
          example: '1999-12-31'
        startDateChange:
          format: date
          example: '2000-12-31'
        phone:
          format: string
          example: '1231231234'
          nullable: true
        email:
          format: string
          example: 'john.doe@sonnys.com'
          nullable: true

    WashbookListItemObject:
      type: object
      description: Represents a washbook item (washbook and recurring washbook).
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for the prepaid account.
        name:
          type: string
          example: "Gold Washbook Account Name"
          nullable: true
          description: The name of the washbook account.
        balance:
          type: string
          example: "5"
          nullable: false
          description: The number of redemptions left on the washbook account. Typically balances in the 900 range are meant to be considered as unlimited redemptions.
        signUpDate:
          format: datetime
          example: '2000-12-30 13:15:15'
          nullable: false
          description: The date the washbook account was created.
        cancelDate:
          format: datetime
          example: '2020-12-31 13:15:15'
          nullable: true
          description: The date the washbook account was cancelled. For non-recurring washbook this is typically null value.
        billingSiteId:
          type: number
          example: 5
          description: Indicates which car wash site the washbook account was opened/created.
        customerId:
          type: string
          example: '876:1001'
          nullable: true
          description: A unique identifier required for the customer. The customer that is tied to this account.
        status:
          format: string
          example: 'Active'
          description: Displays the status of the account. The return values will typically be "Active" or "Inactive".


    SiteObject:
      type: object
      description: Represents a site - physical or virtual.
      properties:
        code:
          type: string
          example: 'MAIN'
          nullable: true
          description: This is the string version of the site id. The "code" is meant as a shortened version of the site actual name. This can be a empty string value.
        name:
          type: string
          example: "MAIN SITE - UNIVERSITY DR"
          nullable: false
          description: The full name of the site.
        timezone:
          type: string
          example: "America/Chicago"
          nullable: true
          description: The timezone of the site. The term time zone can be used to describe several different things, but mostly it refers to the local time of a region or a country.

    RecurringWashbookListItemObject:
      type: object
      description: Represents a recurring washbook account.
      properties:
        id:
          type: string
          example: '876:1001'
          description: A unique identifier for the recurring prepaid account.
        name:
          type: string
          example: "Gold Washbook Account Name"
          nullable: true
          description: The name of the recurring washbook account.
        balance:
          type: number
          example: "5"
          nullable: true
          description: The number of redemptions left on the washbook account. Typically balances in the 900 range are meant to be considered as unlimted redemptions.This will always be null for a recurring account.
        signUpDate:
          format: datetime
          example: '2020-05-19 08:45:00'
          nullable: false
          description: The datetime (UTC) the recurring washbook account was created.
        cancelDate:
          format: datetime
          example: '2020-05-19 08:45:00'
          nullable: true
          description: The date the recurring washbook account was cancelled. This will usually be a null value by default. Please note that this field is dyanamic based on date entered. For example, if the month of January was entered as a date filter. The API will return the cancel date of that account for the month of Janurary -if it was canceled.
        billingSiteId:
          type: number
          nullable: false
          example: 5
          description: Indicates which car wash site the recurring washbook account was opened is set up for billing purposes. Usually be default the billing site id can be thought of as the site of original sale. However, billingSiteId can change so don't be attached to the `site of orignal sale` definition.
        customerId:
          type: string
          example: '876:1001'
          nullable: true
          description: A unique identifier required for the customer. The customer that is tied to this account.
        status:
          format: number
          example: 1
          nullable: false
          description: Displays the status of the account in number format.
        statusName:
          type: string
          example: 'Active'
          enum: ["Active", "Payment Failed", "Payment CC Expired","Payment Retries Exceeded","Suspended","Expired","Cancelled","Declined","Authorizer Error","Cleared Tokens","Changed Authorizer","Payment CC Update Started","Payment CC Update Declined","Authorizer communication error","Unknown error error"]
          description: The status of the account in string format. Please note that this field is dyanamic based on date entered. For example, if the month of January was entered as a date filter the API will return status of that account for the month of Janurary. If no date filtered was entered then the lastest status will be returned.
          nullable: false
        billingSiteCode:
          type: string
          nullable: false
          example: "MAIN"
          description: Indicates which car wash site the recurring washbook account was opened is set up for billing purposes. Usually be default the billing site id can be thought of as the site of original sale. However, billingSiteId can change so don't be attached to the `site of orignal sale` definition.  This field is similar to the `billingSiteId`, but gives the site code instead. This site code is a string format of `billingSiteId` field.

    RecurringWashbookStatusListItemObject:
      type: object
      description: Represents a recurring washbook account status.
      properties:
        washbook_account_id:
          type: string
          example: '876:1001'
          description: A unique identifier for the recurring prepaid account.
        recurring_id:
          type: string
          example: '876:1001'
          description: A alternative unique identifier for the recurring prepaid account.
        old_status:
          type: string
          example: "Declined"
          nullable: false
          description: The previous status of the recurring account.
          enum: ["Active", "Payment Failed", "Payment CC Expired","Payment Retries Exceeded","Suspended","Expired","Cancelled","Declined","Authorizer Error","Cleared Tokens","Changed Authorizer","Payment CC Update Started","Payment CC Update Declined","Authorizer communication error","Unknown error"]
        new_status:
          type: string
          example: "Active"
          nullable: false
          description: The new status of the recurring account.
          enum: ["Active", "Payment Failed", "Payment CC Expired","Payment Retries Exceeded","Suspended","Expired","Cancelled","Declined","Authorizer Error","Cleared Tokens","Changed Authorizer","Payment CC Update Started","Payment CC Update Declined","Authorizer communication error","Unknown error"]
        status_date:
          format: datetime
          example: '2020-05-19T08:45:00.000Z'
          nullable: false
          description: The datetime (UTC) the recurring washbook account was changed
        employee_name:
          format: string
          example: 'John Doe'
          nullable: false
          description: The employee that performed the status change. Employees can be considered as software services.
        site_code:
          type: string
          nullable: false
          example: "MAIN"
          description: Indicates which site the status change occurred.

    RecurringWashbookListModificationItemObject:
      type: object
      description: Represents a recurring washbook account.
      allOf:
        - $ref: '#/components/schemas/RecurringAccountDetailObject'
        - type: object
          properties:
            modifications:
              type: array
              items:
                type: object
                properties:
                  modificationType:
                    type: string
                    example: "Tag Removed"
                    nullable: false
                    description: The modification applied to the recurring washbook account.
                  modificationDate:
                    format: datetime
                    example: '2025-01-01 13:15:15'
                    nullable: false
                    description: The datetime (UTC) the recurring washbook account was modified.


paths:

  /item:
    get:
      tags:
        - Item
      summary: Return the list items.
      description:
        "Use this endpoint to retrieve the list of items that are for sale.

        \n\n

        Notes about endpoint:\n\n
        1. The results/response of each request is cached for 1 hour.

        \n\n
        2. Whether `isPromptForPrice` field is `true` or `false` value, the `priceAtSite` field will always have a number in string format. When `isPromptForPrice` field is `true`
        that means when the item is sold at POS (Point of Sale). The POS will display an actual prompt for the cashier to enter a price for the item being sold. When `isPromptForPrice` field is `false`
        no prompt will display on the POS.

        \n\n
        3. When the input criteria does not have any results. The `item` value will have a empty array in response payload. For example,
        if the `offset` field and `limit` field is greater than the `total` field an empty `item` field array will be returned. Specifically,
        if the `total` in response payload is `2`, but you request a `offset` of `3` and `limit` of `50` then the `item` will have a empty array in response.

        ## Testing \n
         Test your integration before going live using the sandbox endpoint.

         \n\n
         \n\n - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
         \n\n - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
         \n\n - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL."

      operationId: itemList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
        - $ref: '#/components/parameters/CollectionDepartmentNameParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'item', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of item objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      items:
                        type: array
                        items:
                          $ref: '#/components/schemas/ItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /transaction:
    get:
      tags:
        - Transaction
      summary: Return the list transactions
      description: >-
        Use this endpoint to retrieve the list of transactions
        in the given period of time.
        If not period of time defined, today transactions will be retrieved.

        ## Testing
          Test your integration before going live using this test information:

          - `Site code not found`: Use **invalid** as `site` param in the URL.
          - `Region code not found`: Use **invalid** as `region` param in the URL.
          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: transactionList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/TransactionSiteParameter'
        - $ref: '#/components/parameters/TransactionRegionParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of transaction objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      transactions:
                        type: array
                        items:
                          $ref: '#/components/schemas/TransactionListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'


  /transaction/type/{item_type}:
    get:
      tags:
        - Transaction
      summary: Return the list transactions by the given type
      description: >-
        Use this endpoint to retrieve the list of transactions
        in the given period of time.
        If not period of time defined, today transactions will be retrieved.

        ## Testing
          Test your integration before going live using this test information:

          - `Site code not found`: Use **invalid** as `site` param in the URL.
          - `Region code not found`: Use **invalid** as `region` param in the URL.
          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: transactionItemTypeList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/TransactionItemTypeParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/TransactionSiteParameter'
        - $ref: '#/components/parameters/TransactionRegionParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction/wash', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of transaction objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      transactions:
                        type: array
                        items:
                          $ref: '#/components/schemas/TransactionListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /transaction/{trans_id}:
    get:
      tags:
        - Transaction
      summary: Return the details of a transaction
      description: >-
        Use this endpoint to retrieve the details of a transaction.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.
          - `Transaction id not found`: Use **999:999** as `trans_id` param in the URL.

          To get different types of tenders: The tender type will be generated based on the
          `trans_id` param.

          The last number before the colon will be used in the following way:
          - 0 for Credit (the type of credit card will be randomized)
          - 1 for RFID
          - 2 for RFID Recurring
          - 3 for LPR
          - 4 for Gift card
          - 5 for House Account RFID
          - 6 for Prepaid Wash
          - any other will be Cash

          Example:
          - 4978:999 will generate Cash tender
          - 5320:999 will generate Visa/MasterCard/Discover/American tender
          - 4292:999 will generate RFID Recurring tender

      operationId: transactionDetails
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/TransactionIdParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction/999:999', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: Will hold an object with the transactions detail.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/TransactionObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /transaction/version-2:
    get:
      tags:
        - Transaction
      summary: Return the list transactions (VERSION 2)
      description: >-
        Use this endpoint to retrieve the list of transactions (VERSION 2)
        in the given period of time.
        If not period of time defined, today transactions will be retrieved.

        This endpoint has a 10 minute cache for each response. For example, if you send specific reporting
        criteria to this endpoint. The API will build the reporting data then cache the data and send it back to
        the API User.

        ## Testing
          Test your integration before going live using this test information:

          - `Site code not found`: Use **invalid** as `site` param in the URL.
          - `Region code not found`: Use **invalid** as `region` param in the URL.
          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: transactionListVersion2
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/TransactionSiteParameter'
        - $ref: '#/components/parameters/TransactionRegionParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction/version-2', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of transaction objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      transactions:
                        type: array
                        items:
                          $ref: '#/components/schemas/TransactionListItemVersion2Object'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /transaction/load-job:
    post:
      tags:
        - Transaction
      summary: Returns a hash
      description:
        "Use this endpoint to get a list of transaction details.

        \n\nPlease get familiar with the workings of this endpoint before using the parent endpoint - `/transaction/get-job-data`. Both of these endpoints work together,  `/transaction/load-job` and `/transaction/get-job-data`.

        \n\n

        Notes about endpoint:
        \n\n
        1. This endpoint takes in a set of reporting criteria to build reporting data.

        \n\n
        2. Once the input data is accepted the reporting data will start to build in a background process and a hash will be returned to the API User. This hash is a unique identifier that is tied to your reporting criteria. Use that hash to get your data in the second endpoint -  `/transaction/get-job-data`.

                \n\n
        3. Please note that the data tied to this endpoint is cached for  20 minutes. For example, if you input the exact reporting criteria to this endpoint within a 20 minute time frame. The API will not trigger a background process. Instead a hash will be returned and you can use that hash to get your reporting data.
          \n\n
        4. The API user must request 100 records for each request and the date range for reporting criteria can only be within a 24 hour time span."

      operationId: transactionListLoadJob
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/TransactionSiteParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction/load-job', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of transaction objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      hash:
                        type: string
                        example:
                          '1aabac6d068eef6a7bad3fdf50a05cc8'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /transaction/get-job-data:
    get:
      tags:
        - Transaction
      summary: Returns transaction data
      description:

        "Use this endpoint to get a list of transaction details.

        \n\nBefore reading this endpoint documentation please read the documentation to `/transaction/load-job`.

        \n\n

        Notes about endpoint:\n\n
        1. Use this endpoint as an alternative to the previous list endpoints (`/transaction`, `/transaction/{trans_id}`). The reponse format of this endpoint is similar to the Line Item Sales Web Report.

        \n\n
        2. Use the hash you received from `/transaction/load-job` and input it to this endpoint `/transaction/get-job-data`.

        \n\n
        3. Please note that the reponse data tied to this endpoint is cached for  20 minutes. When 20 minutes expire and the API user uses the expired hash to get data from this endpoint. The endpoint will return error - HTTP 404. To prevent 404 you would have to get a valid hash from the following endpoint `/transaction/get-job-data`

        ## Testing
          Test your integration before going live using this test information:

          - `Site code not found`: Use **invalid** as `site` param in the URL."

      operationId: transactionListGetJobData
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/TransactionHashParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'transaction/get-job-data?hash=1aabac6d068eef6a7bad3fdf50a05cc8', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of transaction objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      hash:
                        type: string
                        example: "1aabac6d068eef6a7bad3fdf50a05cc8"
                      status:
                        type: string
                        example: "pass"
                        enum: ["pass", "working", "fail"]
                      data:
                        type: array
                        items:
                          $ref: '#/components/schemas/TransactionObject'
                        description: A list of detailed transactions
                      offset:
                        type: integer
                        nullable: false
                        example: 0
                      limit:
                        type: integer
                        nullable: false
                        example: 10
                      total:
                        type: integer
                        nullable: false
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /customer:
    get:
      tags:
        - Customer
      summary: Return the list customers
      description: >-
        Use this endpoint to retrieve the list of customers.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: customerList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/CustomerFirstNameParameter'
        - $ref: '#/components/parameters/CustomerLastNameParameter'
        - $ref: '#/components/parameters/CustomerStatusParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
        - $ref: '#/components/parameters/CustomerStartDateParameter'
        - $ref: '#/components/parameters/CustomerEndDateParameter'
        - $ref: '#/components/parameters/CustomerPhoneNumberParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'customer', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of customer objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      customers:
                        type: array
                        items:
                          $ref: '#/components/schemas/CustomerListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /customer/{customer_id}:
    get:
      tags:
        - Customer
      summary: Return the details of a customer
      description: >-
        Use this endpoint to retrieve the details of a customer.

        ## Testing
          Test your integration before going live using this test information:

          - `Customer id not found`: Use **999:999** as `customer_id` param in the URL.

      operationId: customerDetails
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/CustomerIdParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'customer/999:999', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: Will hold an object with the customer details.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/CustomerObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /employee/{employee_id}/clock-entries:
    get:
      tags:
        - Employee
      summary: Returns a list of employee clock entries
      description: >-
        Use this endpoint to retrieve a list of employee clock entries

        If the `startDate` and `endDate` is omitted then the endpoint will load the most recent clock entries for that employee.
        Also the `startDate` and `endDate` range will have a max range of 14 days. If your range is larger
        than 14 days a validation error will occur.


        ## Testing
          Test your integration before going live using this test information:

          - `Employee id not found`: Use **2** as `employee_id` param in the URL.
          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: employeeClockEntries
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/EmployeeIdParameter'
        - $ref: '#/components/parameters/StartDateYMDParameter'
        - $ref: '#/components/parameters/EndDateYMDParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', '/employee/{employee_id}/clock', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of employee clockentries objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      weeks:
                        type: array
                        items:
                          type: object
                          properties:
                            week:
                              type: string
                              example: "2021-01-08 - 2021-01-14"
                            weekTotalRegularHours:
                              type: number
                              format: double
                            weekTotalOverTimeHours:
                              type: number
                              format: double
                            clockEntries:
                              type: array
                              items:
                                $ref: '#/components/schemas/EmployeeClockEntryObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /employee:
    get:
      tags:
        - Employee
      summary: Returns a list of employees
      description: >-
        Use this endpoint to retrieve a list of employees

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: employee
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', '/employee', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of employee clockentries objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      employees:
                        type: array
                        items:
                          $ref: '#/components/schemas/EmployeeListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /employee/{employee_id}:
    get:
      tags:
        - Employee
      summary: Return the details of a employee
      description: >-
        Use this endpoint to retrieve the details of a employee.

        ## Testing
          Test your integration before going live using this test information:

          - `Employee id not found`: Use **1** as `employee_id` param in the URL.

      operationId: employeeDetails
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/EmployeeIdParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'employee/1', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: Will hold an object with the employee details.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/EmployeeDetailsObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /giftcard-liablilty:
    get:
      tags:
        - Prepaids
      summary: Return the list giftcard
      description: >-
        Use this endpoint to retrieve the list of giftcard.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: giftcardList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/PrepaidNumberParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/TransactionSiteParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'giftcard-liablilty', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of prepaid objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      giftcards:
                        type: array
                        items:
                          $ref: '#/components/schemas/GiftcardListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /recurring/account/list:
    get:
      tags:
        - Prepaids
      summary: Return the list recurring monthly and yearly accounts
      description: >-
        Use this endpoint to retrieve the recurring monthly and yearly accounts.

        If you do not enter a start date and end date then the start date will default to "first day of last month" and end date will default to "today". Note that the date filters are filtering against the creation date (sign up date) of the account. Finally the date filter max range is 6 months. If the selected date range is larger than 6 months then an error will be thrown.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: prepaidWashbookRecurringAccountList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/RecurringAccountStatusParameter'
        - $ref: '#/components/parameters/CustomerIdQueryParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/ItemIdQueryParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'recurring/account/list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of prepaid objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      accounts:
                        type: array
                        items:
                          $ref: '#/components/schemas/RecurringWashbookListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /recurring/account/status-list:
    get:
      tags:
        - Prepaids
      summary: Return the list of recurring accounts and their respective status in a given time range
      description:
        "Monthly and Yearly recurring accounts are products that are for sale to any customer. Once a customer purchases one of these products they will be granted car wash priledges are one or more car wash site. The billing for each product can be annual or recurring. When a customer purchases a recurring product a account will be created and that account will be tied to that product.
         \n\n
        Use this endpoint to retrieve the recurring monthly and yearly accounts statuses. There are some use cases where a account can change status. For example, maybe the account could have a expired credit card and when that happens the account will change to a different status. You can use this type of data for many reasons. One example is to formulate your own customer churn data.
          \n\n
                The query parameters for this endpoint is `dateStart`, `dateEnd`, `recurringAccountStatus`. Please inspect the request body data for more information on these fields. When you omit the accountStatus field the endpoint will fetch accounts with all statuses.

        ## Recurring Account Statuses

        `1` `Active` - The account is active. This means that the account can be used to redeem washes at a car wash site. The billing software will re-bill this account each month or year. \n\n
        `2` `Payment Failed` - The billing software billing attempt had failed. Billing software will retry up to the global setting amount. \n\n
        `3` `Payment CC Expired` - The payment credit card has expired (as indicated from payment processor)  \n\n
        `4` `Payment Retries Exceeded` - The billing software failed to make the payment too many times. The number of times is set in the global setting in Backoffice.  \n\n
        `5` `Suspended` - The billing is suspended and will not bill until on or after the suspend date. Think of this as a 'pause' on billing.  \n\n
        `6` `Expired` - The account has expired or reached it limit.  \n\n
        `7` `Cancelled` - The account was manually cancelled.  \n\n
        `8` `Declined` - The payment authorizer (World Pay, Windcave, Exact, etc) has denied the payment authorization. \n\n
        `9` `Authorizer Error` - The billing software was unable to communicate with payment authorizer (World Pay, Windcave, Exact, etc) \n\n
        `10` `Cleared Tokens` - A cashier at a POS has removed the payment processor tokens for this account. Usually this is done when a cashier updates the wrong account with a different customer's credit card, then realizes their mistake.  \n\n
        `11` `Changed Authorizer` - The payment authorizer (World Pay, Windcave, Exact, etc) that was used to create the account and tokens was changed, making the tokens invaid. As a result, billing software could not make proper billing attempt.  \n\n
        `12` `Payment CC Update Started` - The credit card on file is being replaced with a new card. This is a process that is done between billing software and payment authorizer.  \n\n
        `13` `Payment CC Update Declined` - The credit card on file was unable to update and may be expired.  \n\n
        `14` `Authorizer communication error` - The  billing software could not reach payment authorizer. Billing software will retry again on the next run (minutes, hours, days, etc.).  \n\n
        `15` `Unknown error` - Internal error - equivalent to HTTP 500.
        \n\n
        This endpoint has a 1 hour response cache. How this works is the follow \n\n
        1. API user sends valid request
        2. API returns response and caches response for 1 hour
        3. API user sends the same exact response within 1 hour. API will return what is in cache
        Finally API keys have permissions based on site. For example, if your API key does not have access to a specific site then that data will be omitted in reponse.
        "

      operationId: prepaidWashbookRecurringAccountStatusList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/RecurringAccountStatusParameter'
        - $ref: '#/components/parameters/StartDateNoLimitParameter'
        - $ref: '#/components/parameters/EndDateNoLimitParameter'
        - $ref: '#/components/parameters/CollectionLimitParameterV2'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'recurring/account/status-list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of prepaid objects and their statuses.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      accounts:
                        type: array
                        items:
                          $ref: '#/components/schemas/RecurringWashbookStatusListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /recurring/account/modifications:
    get:
      tags:
        - Prepaids
      summary: Return the list of recurring monthly and yearly accounts that have had a modification.
      description: >-
        Use this endpoint to retrieve the recurring monthly and yearly accounts that have had a modification within a date range.
        If you do not enter a start date and end date then the start date will default to "first day of last month" and end date will default to "today". 
        Note that the date filters are filtering against the creation date (sign up date) of the account. Finally the date filter max range is 6 months. 
        If the selected date range is larger than 6 months then an error will be thrown.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: prepaidWashbookRecurringAccountModificationList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/RecurringAccountModificationParameter'
        - $ref: '#/components/parameters/RecurringAccountSiteParameter'
        - $ref: '#/components/parameters/StartDateYMDParameter'
        - $ref: '#/components/parameters/EndDateYMDParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
        # Here the list of possible modifications to filter by
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'recurring/account/modifications', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of prepaid objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      accounts:
                        type: array
                        items:
                          $ref: '#/components/schemas/RecurringWashbookListModificationItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /washbook/account/list:
    get:
      tags:
        - Prepaids
      summary: Return the list non-recurring washbook accounts
      description:
        "Return the list non-recurring washbook accounts. These products can be described as bulk prepaid washes. For example, instead of
        purchasing a single wash. A customer can purchase a washbook (package of prepaid washes) and redeem the wash or washes at a car wash site. Whenever a washbook is purchased a washbook account' is created to represent that sale. The account will keep track of the number of washes left. That is purpose of this endpoint is to retrieve the list of washbook accounts.

        \n\n Some details to note about the parameters of this endpoint:
        \n\n 1. The startDate and endDate parameters are date ranges used to filter when a washbook account was created. For example, if you wanted to retrieve a list of accounts that is created in the month of April 2022. You would set startDate=1648785600 and endDate=1651377599.
        \n\n 2. If you do not enter a start date and end date then the start date will default to 'first day of last month' and end date will default to 'today'. Note that the date filters are filtering against the creation date (sign up date) of the account. Finally the date filter max range is 6 months. If the selected date range is larger than 6 months then an error will be thrown.

        \n\n ## Testing
        \n\n  Test your integration before going live using this test information:
        \n\n
        \n\n  - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
        \n\n  - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
        \n\n  - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL."

      operationId: prepaidWashbookAccountList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/AccountStatusParameter'
        - $ref: '#/components/parameters/CustomerIdQueryParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/ItemIdQueryParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'washbook/account/list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of prepaid objects.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      accounts:
                        type: array
                        items:
                          $ref: '#/components/schemas/WashbookListItemObject'
                      offset:
                        type: integer
                        example: 0
                      limit:
                        type: integer
                        example: 10
                      total:
                        type: integer
                        example: 22
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /washbook/account/{account_id}/detail:
    get:
      tags:
        - Prepaids
      summary: Return the the details of a given prepaid washbook account.
      description:
        "Return the the details of a given prepaid washbook account.

        \n\n Note that this can represent prepaid accounts that are recurring (monthly, annual) or non-recurring."

      operationId: prepaidWashbookAccountDetails
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/AccountIdIdParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'washbook/account/{account_id}/detail', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with data about prepaid account.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/WashbookAccountDetailObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /site/list:
    get:
      tags:
        - Site
      summary: Return a list of physical and virtual sites.
      description:
        "Return a list of physical and virtual sites.
        \n\n Physical sites are sites that have an actual location in the geographical plane.They have a actual address.
        
        \n\n Virtual sites are meant for ecommerce only. For example, if you wanted to retrieve a list of all ecomm sales you would use the virtual site in the transaction endpoint to get that data.
        
        \n\n This endpoint has a 1 hour cache. This endpoint does not paginate any site list info.
        
        \n\n## Testing                      
        \n\n  Test your integration before going live using this test information:

        \n\n  - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
        \n\n  - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
        \n\n  - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL."

      operationId: siteList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'site/list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with data for sites
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      sites:
                        type: array
                        items:
                          $ref: '#/components/schemas/SiteObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /recurring/account/{account_id}/detail:
    get:
      tags:
        - Prepaids
      summary: Return the the details of a given recurring washbook account.
      description:
        "Return the the details of a given recurring washbook account. For example,
        \n this endpoint will give trial info, billing info, plan name, etc.
        
        \n\n What is a recurring washbook account?
        \n\n This is a account that is tied to a recurring item that was purchased by a 
        \n customer. The billing cycle of a active recurring account can be either monthly or annual."
      operationId: recurringAccountDetails
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/AccountIdIdParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'recurring/account/{account_id}/detail', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with data about recurring account.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/RecurringAccountDetailObject'
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '404':
          $ref: '#/components/responses/EntityNotFoundResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'

  /recurring/account/details/list:
    get:
      tags:
        - Prepaids
      summary: Return the list of recurring monthly and yearly accounts details.
      description: >-
        Use this endpoint to retrieve the list of recurring monthly and yearly accounts details.

        If you do not enter a start date and end date then the start date will default to "first day of last month" 
        and end date will default to "today". Note that the date filters are filtering against the 
        creation date (sign up date) of the account. Finally the date filter max range is 1 month. 
        If the selected date range is larger than 1 month then an error will be thrown.

        ## Testing
          Test your integration before going live using this test information:

          - `Invalid site code`: Use **INVALID** as `X-Sonnys-Site-Code` header in the URL.
          - `Unauthorized site code`: Use **ABC** as `X-Sonnys-Site-Code` header in the URL.
          - `Authorized site code and unauthorized site code query argument`: Use **DEF** as `X-Sonnys-Site-Code` header in the URL.

      operationId: prepaidWashbookRecurringAccountDetailsList
      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/SiteApiKeyHeaderParameter'
        - $ref: '#/components/parameters/RecurringAccountStatusParameter'
        - $ref: '#/components/parameters/TransactionStartDateParameter'
        - $ref: '#/components/parameters/TransactionEndDateParameter'
        - $ref: '#/components/parameters/CollectionLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', 'recurring/account/details/list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: A JSON array with a list of recurring account details.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      accounts:
                        type: array
                        items:
                          $ref: '#/components/schemas/RecurringAccountDetailObject'
                      offset:
                        type: integer
                        example: 1
                      limit:
                        type: integer
                        example: 25
                      total:
                        type: integer
                        example: 30
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'
          
          
  /sales-outcome/list:
    get:
      tags:
        - Sales Advisor Tool
      summary: Returns a list of SalesAdvisorTool data capturing employee sales outcomes, including whether a customer was converted to a plan or not. By default there will be 500 records per page.

      parameters:
        - $ref: '#/components/parameters/ApiKeyHeaderParameter'
        - $ref: '#/components/parameters/ApiIdHeaderParameter'
        - $ref: '#/components/parameters/CollectionSalesAdvisorLimitParameter'
        - $ref: '#/components/parameters/CollectionOffsetParameter'
        - $ref: '#/components/parameters/CustomerStartDateParameter'
        - $ref: '#/components/parameters/CustomerEndDateParameter'    
      x-code-samples:
        - lang: PHP
          source: >
            $client = new GuzzleHttp\Client(['base_uri' =>
            'https://sandboxapi.sonnyscontrols.com/v1']);

            $res = $client->request('GET', '/sat/list', [
              'headers' => [
                'Accept'     => 'application/json',
                'X-Sonnys-API-ID' => 'my-sonnys-api-id',
                'X-Sonnys-API-Key' => 'my-specific-api-Key',
              ]
            ]);

            if ($res->getStatusCode() !== '200') {
              throw new Exception('An error has occurred');
            }

            $json = $res->getBody();

      responses:
        '200':
          description: Returns a list of SalesAdvisorTool data capturing employee sales outcomes, including whether a customer was converted to a plan or not. By default there will be 500 records per page.
          content:
              application/json:
                schema:
                  type: object
                  properties:
                    data:
                      type: object
                      properties:
                        sales:
                          type: array
                          description: List of sales outcome records
                          items:
                            type: object
                            properties:
                              timestamp:
                                type: string
                                example: "1123123"
                                description: Unix timestamp of when transaction occurred
                              employeeId:
                                type: string
                                example: "1"
                                description: Unique identifier for employee
                              employeeName:
                                type: string
                                example: "Ralph Edwards"
                                description: Employee name
                              siteId:
                                type: string
                                example: 1
                                description: The unique identifier for the site.
                              site:
                                type: string
                                example: "100 - OP Blue Valley"
                                description: The site where the sale outcome occurred.
                              isConverted:
                                type: string
                                example: yes
                                description: Did the employee convert customer to recurring or washbook.
                              itemId:
                                type: string
                                example: "1:999"
                                description: The unique identifier for the item
                              itemName:
                                type: string
                                example: bronze recurring
                                description: The name of the item sold to customer
                              itemPrice:
                                type: string
                                example: "15.00"
                                description: The price of the item sold to customer
                              terminalName:
                                type: string
                                example: POS1
                                description: DRB sales device or terminal info
                        offset:
                          type: integer
                          example: 0
                          description: Current page number
                        limit:
                          type: integer
                          example: 10
                          description: Number of records per page
                        total:
                          type: integer
                          example: 22
                          description: Total number of records
                  
        '400':
          $ref: '#/components/responses/BadRequestResponse'
        '403':
          $ref: '#/components/responses/NotAuthorizedResponse'
        '429':
          $ref: '#/components/responses/RateExceededResponse'
        '500':
          $ref: '#/components/responses/ServerErrorResponse'                            
