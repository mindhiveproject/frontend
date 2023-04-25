import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Link from "next/link";

import Error from "../ErrorMessage/index";

import ProposalPDF from "./pdf";

import { PROPOSAL_PDF_QUERY } from "../Queries/Proposal";

class ProposalPublic extends Component {
  render() {
    return (
      <Query query={PROPOSAL_PDF_QUERY} variables={{ slug: this.props.slug }}>
        {(proposalPayload) => {
          const proposalPayloadError = proposalPayload.error;
          const proposalPayloadLoading = proposalPayload.loading;
          const proposalPayloadData =
            proposalPayload.data && proposalPayload.data.proposalBoard;
          if (proposalPayloadError)
            return <Error error={proposalPayloadError} />;
          if (proposalPayloadLoading) return <p>Loading</p>;
          if (!proposalPayloadData)
            return (
              <div>
                <h1>No proposal found</h1>
                <Link
                  href={{
                    pathname: "/",
                  }}
                >
                  <a>
                    <p>Check the list of public studies</p>
                  </a>
                </Link>
              </div>
            );

          return (
            <ProposalPDF
              proposal={proposalPayloadData}
              loading={proposalPayloadLoading}
            />
          );
        }}
      </Query>
    );
  }
}

export default ProposalPublic;
