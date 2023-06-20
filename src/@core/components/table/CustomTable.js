import PropTypes from "prop-types";
import React from "react";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { Button, Col, Row } from "reactstrap";
import { NoDataFound } from "../../../assets/images";
import "../../../assets/scss/custom.scss";

const CustomTable = (props) => {
  const Show = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between">
        {props?.isFilterByPlan && (
          <div className="search-box me-2 d-inline-block">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search plan name"
                onChange={(e) => props.getFilterValue(e.target.value)}
              />
            </div>
          </div>
        )}

        {props?.getSearchValue && (
          <Col className="search-box mx-2 my-1 d-flex justify-content-end align-content-end">
            <div className="table-search">
              <i className="bx bx-search-alt search-icon" />
              <input
                placeholder="Search"
                className="form-control"
                onChange={(e) => {
                  setTimeout(() => props.getSearchValue(e.target.value), 1000);
                }}
              />
            </div>
          </Col>
        )}

        {props?.isButton && (
          <Button color="info" onClick={props.clickOnButton}>
            {props?.isButton}
          </Button>
        )}
        {props?.isField ? <div>{props?.field}</div> : ""}
      </div>
      <div className="table-responsive p-0 rounded-lg data-table">
        <table className="table align-items-center mb-0 table-striped">
          {/* column headers */}
          <thead className="table-head">
            <tr>{props?.columnHeaders}</tr>
          </thead>

          {/* table body */}
          <tbody>{props?.dataRows}</tbody>
        </table>

        {props?.totalCount === 0 && (
          <div className="p-3">
            <div className="d-flex justify-content-center">
              <img
                src={NoDataFound}
                alt="no_data_found"
                height="220"
                width="220"
              />
            </div>
          </div>
        )}
      </div>

      {props?.totalCount !== 0 && (
        <div className="d-flex justify-content-between p-2">
          {props?.isPerPageChange && (
            <div className="search-box d-inline-block">
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={Show[0]}
                options={Show}
                onChange={(e) => props?.handlePerPageChangeValue(e.value)}
              />
            </div>
          )}

          <Row className="align-items-md-center">
            <Col className="pagination pagination-rounded justify-content-end">
              <Pagination
                hideDisabled
                hideFirstLastPages={true}
                activePage={props?.pageNumber}
                totalItemsCount={props?.totalCount || 0}
                itemsCountPerPage={props?.perPage}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={props?.handlePageChange}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

// component props validation
CustomTable.propTypes = {
  columnHeaders: PropTypes.object,
  dataRows: PropTypes.object,
  isSearch: PropTypes.bool,
  isPerPageChange: PropTypes.bool,
  isFilterByPlan: PropTypes.bool,
  getSearchValue: PropTypes.func,
  handlePerPageChangeValue: PropTypes.func,
  getFilterValue: PropTypes.func,
  clickOnButton: PropTypes.func,
  isButton: PropTypes.any,
  isField: PropTypes.bool,
  field: PropTypes.any,
  handlePageChange: PropTypes.func,
  perPage: PropTypes.number,
  totalCount: PropTypes.number,
  pageNumber: PropTypes.number,
};

export default CustomTable;
