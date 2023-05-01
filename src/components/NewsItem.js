import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, auther, date, source } = this.props;
        return (
            <>
                <div className="card my-4">
                    <img src={imageUrl ? imageUrl : "https://resources.pulse.icc-cricket.com/ICC/photo/2023/04/27/8e0376c9-e794-4af1-bcd2-62bb4985e5d0/GettyImages-1245541347.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger px-3 py-2" style={{zIndex:"100", left:"50%"}}>{source}</span>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {auther} on {new Date(date).toGMTString()} </small></p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem
