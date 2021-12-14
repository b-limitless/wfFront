import { Section } from "components/common";
import React from "react";
import { Box, Card, ELinkTheme, Link, Text } from "trolly/common";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  linksList: {
    marginBottom: "40px",
    "& li": {
      listStyleType: "circle",
      listStylePosition: "outside",
      marginBottom: "20px",
    },
  },
});

const Disclosure = () => {
  const { linksList } = useStyles();
  const headerProps = {
    fontSize: "22px",
    fontWeight: 600,
    color: "text.primary",
    marginBottom: "20px",
  };
  const titleProps = {
    fontSize: "18px",
    fontWeight: 500,
    color: "text.secondary",
    marginBottom: "20px",
  };

  const linkProps = {
    fontSize: "18px",
    fontWeight: 500,
    marginBottom: "20px",
    color: "primary" as ELinkTheme,
  };
  return (
    <Section>
      <Text
        marginBottom="20px"
        fontSize="20px"
        fontWeight={600}
        color="text.primary"
      >
        DriveWealth Brokers Terms and Conditions
      </Text>
      <Card padding="30px">
        <Text {...headerProps}>Market Data Agreements</Text>
        <Text {...titleProps}>
          By checking the box below I acknowledge that I have read the market
          data agreements below from the represented exchanges, and I hereby
          certify that I qualify as a non-professional pursuant to the
          definitions described herein.
        </Text>
        <ul className={linksList}>
          <li>
            <Link
              {...linkProps}
              href="https://legal.drivewealth.com/bats-subscriber-agreement?lang=en_US"
            >
              BATS Market Data Agreement
            </Link>
          </li>
          <li>
            <Link
              {...linkProps}
              href="https://legal.drivewealth.com/nasdaq-subscriber-agreement?lang=en_US"
            >
              NASDAQ Subscriber Agreement
            </Link>
          </li>
          <li>
            <Link
              {...linkProps}
              href="https://legal.drivewealth.com/nyse-amex-subscriber-agreement?lang=en_US"
            >
              NYSE/AMEX Subscriber Agreement
            </Link>
          </li>
        </ul>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Link
            {...linkProps}
            href="https://legal.drivewealth.com/disclosures-disclaimers?lang=en_US"
          >
            DriveWealth Agreement to Disclosures
          </Link>
          <Link
            {...linkProps}
            href="https://legal.drivewealth.com/terms-of-use?lang=en_US"
          >
            Terms of Use
          </Link>
          <Link
            {...linkProps}
            href="https://legal.drivewealth.com/customer-account-agreement?lang=en_US"
          >
            DriveWealth Customer Account Agreement
          </Link>
          <Link
            {...linkProps}
            href="https://legal.drivewealth.com/cash-management-program-disclosure-statement?lang=en_US"
          >
            Cash Management Program Disclosure Statement
          </Link>
        </Box>
        <Text {...headerProps}>Rule 14b1(c)</Text>
        <Text {...titleProps}>
          Rule 14b-1(c) of the Securities Exchange Act, unless you object,
          requires us to disclose to an issuer, upon its request, the names,
          addresses, and securities positions of our customers who are
          beneficial owners of the issuer's securities held by us in nominee
          name. The issuer would be permitted to use your name and other related
          information for corporation communication only.
        </Text>
        <Text {...headerProps}>
          Limited Power Of Attorney And Fee Withdrawal Agreement
        </Text>
        <Text {...titleProps}>
          I have entered into an Investment Advisory Agreement with TEST (the
          “Advisor”) and appointed it as my agent for the limited purpose of
          trading US Exchange listed equities in my account. This agreement
          supplements the other agreements I have executed, and directs
          DriveWealth to follow my Advisor’s direction with respect to such
          trading, and with respect to the periodic withdrawal of the Advisor’s
          fee as directed by that Advisor. I understand that I may not execute
          trades in my account while this agreement is in force.
        </Text>
        <Text {...headerProps}>Role of Advisor</Text>
        <Text {...titleProps} marginBottom="12px">
          This agreement authorizes DriveWealth to accept the instructions of
          the Advisor on my behalf. This authorization will be applicable to all
          assets I hold in this managed account. I hereby grant Advisor the
          Limited Power to buy or sell, exchange, convert, tender, trade, or
          otherwise acquire or dispose of US Exchange listed equities on my
          behalf. I understand that DriveWealth will charge commissions each
          time a trade is effected, and that such commission is separate from
          the management fee paid to my Advisor.
        </Text>
        <Text {...titleProps} marginBottom="12px">
          DriveWealth is authorized to follow the instructions of my Advisor to
          withdraw management fees directly from the account according to the
          terms of the advisory agreement between me and Advisor. I agree to
          indemnify DriveWealth for any fee withdrawals made at the instruction
          of my Advisor in error.
        </Text>
        <Text {...titleProps} marginBottom="12px">
          I authorize DriveWealth to aggregate orders for my account(s) with
          orders for one or more other accounts over which my Advisor has
          trading authority. My Advisor is authorized to receive all information
          regarding my account and to receive account statements, confirmations
          and tax information. I understand that my access to my account is
          limited to view only, and that only my Advisor may execute trades.
        </Text>
        <Text {...titleProps}>
          I acknowledge that this Limited Power of Attorney merely authorizes
          DriveWealth to accept instructions from Advisor to conduct certain
          activities with respect to my account and is not a substitute for an
          advisory agreement.
        </Text>
        <Text {...headerProps}>Role of DriveWealth</Text>
        <Text {...titleProps} marginBottom="12px">
          DriveWealth will merely effect instructions of my Advisor. DriveWealth
          will not provide legal, tax or trading advice, and are not responsible
          for determining the suitability of any investment strategy or
          transaction. DriveWealth is not responsible for investigating or
          selecting Advisor. DriveWealth has no responsibility for reviewing or
          monitoring any investment decision or activity of the Advisor and
          assumes no responsibility for determining if Advisor is complying with
          the laws regarding its provision of advisory services.
        </Text>
        <Text {...titleProps}>
          Neither the Advisor nor any its officers, directors or employees are
          employees, agents or associated persons of DriveWealth and have no
          authority to make any representations or provide any warranties on
          behalf of DriveWealth.
        </Text>
        <Text {...headerProps}>Termination</Text>
        <Text {...titleProps}>
          I agree to notify DriveWealth immediately, in writing, of any changes
          or termination of this Limited Power of Attorney. If I die or become
          incapacitated, this Power of Attorney would be rendered void. This
          Limited Power of Attorney shall remain in effect until DriveWealth
          receives written notice of its termination and has had sufficient time
          to process such notice and terminate Advisor’s authority.
        </Text>
        <Text {...headerProps}>Indemnification of DriveWealth</Text>
        <Text {...titleProps}>
          I agree to hold DriveWealth, and any affiliates, and its and their
          successors and assigns, and its and their directors, officers,
          employees and agents harmless from and against all claims, actions,
          costs and liabilities, including attorney’s fees, arising out of or
          relating to their reliance on this Limited Power of Attorney, or their
          execution of any of Advisor’s instructions. I agree that since
          DriveWealth will not supervise or monitor Advisor’s trading decisions
          or other activities, I will not attempt to hold DriveWealth liable for
          any trade or decision or action of Advisor. DriveWealth’s rights under
          this paragraph are in addition to any other rights it has under other
          agreements with me.
        </Text>
      </Card>
    </Section>
  );
};

export default Disclosure;
