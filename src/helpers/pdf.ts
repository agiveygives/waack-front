import { jsPDF } from 'jspdf';

const title = (name: string, promotion: string): string => `${name} Promotion: ${promotion}`

const clientProject = (doc: jsPDF, startingLine: number) => {
    doc.setFontSize(14);
    doc.text('Client: Project', 20, startingLine);
    doc.setFontSize(11);
    doc.text('Role: ROLE', 20, startingLine + 5);
    doc.text('Date: MONTH, YEAR - MONTH, YEAR', 20, startingLine + 10);
    doc.text('Summary: One - two sentences describing the work and / or main contributions.Shorter is better.', 20, startingLine + 15);
}

const supportingResult = (doc: jsPDF, startingLine: number) => {
    const text = `Include a 2 to 4 sentence summary detailing the ways in which you demonstrated
the above criteria on the project listed.The summary written here should be as light
as possible on project specific domain knowledge while still including enough detail 
to clearly support the criteria in question.The same experience on the same project 
may be relevant in demonstrating multiple criteria and can be repeated as is relevant.
However, this summary writeup for each criteria should clearly connect the dots between 
your behavior and how that demonstrates the above criteria.`
    doc.setFontSize(13);
    doc.text('Criteria line item as written in the Tech Career Progression Framework', 20, startingLine);
    doc.setFontSize(11);
    doc.setFont('arial', 'bold');
    doc.text('Client: Project', 20, startingLine + 5);
    doc.setFont('ariel', 'normal');
    doc.text(text, 20, startingLine + 10)
}

export const exportPDF = (name = 'Ashley', promotion = 'Solution Architect') => {
    const doc = new jsPDF();
    doc.setFont('ariel')

    doc.setFontSize(22)
    doc.text(title(name, promotion), 20, 40);

    doc.setFontSize(16);
    doc.text('Key Supporting Roles', 20, 60);

    doc.setFontSize(11);
    doc.setFont('ariel', 'italic')
    doc.text('Include as many as are relevant, featured from the whole list of roles below', 20, 65);

    doc.setFont('ariel', 'normal');
    clientProject(doc, 75);
    clientProject(doc, 100);

    doc.setFontSize(16);
    doc.text('Key Supporting Results', 20, 125);
    doc.setFontSize(11);
    doc.setFont('ariel', 'italic')
    doc.text('Include as many as are relevant', 20, 130);

    doc.setFont('ariel', 'normal');

    supportingResult(doc, 140)
    supportingResult(doc, 185)
    supportingResult(doc, 230)

    doc.save('a4.pdf');

}

